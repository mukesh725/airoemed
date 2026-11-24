import { STATE_TELEHEALTH_RULES } from './state-rules.js';
export class EligibilityValidator {
    /**
     * Validates whether a patient in a given physical location can initiate
     * care for a requested clinical category.
     */
    static validatePatientEligibility(stateOfResidence, currentPhysicalState, category, patientAgeYears) {
        const reasons = [];
        const rule = STATE_TELEHEALTH_RULES[currentPhysicalState];
        if (!rule) {
            return {
                isEligible: false,
                reasons: [`State ${currentPhysicalState} is not recognized.`],
                requiredDisclosures: [],
            };
        }
        // 1. Check if state is in Phase 1 launch
        if (!rule.isPhase1LaunchState) {
            return {
                isEligible: false,
                reasons: [
                    `AIRO eMed US is not yet licensed to treat patients located in ${rule.stateName}. Please join our waitlist.`,
                ],
                requiredDisclosures: [],
            };
        }
        // 2. State mismatch warning / verification
        if (stateOfResidence !== currentPhysicalState) {
            reasons.push(`Note: Under US medical board rules, care is governed by your current physical location (${currentPhysicalState}).`);
        }
        // 3. Minimum age enforcement
        const requiredAge = rule.minimumAgeRequirement[category];
        if (patientAgeYears < requiredAge) {
            return {
                isEligible: false,
                reasons: [
                    `You must be at least ${requiredAge} years old to receive treatment for ${category} in ${rule.stateName}.`,
                ],
                requiredDisclosures: [],
            };
        }
        // 4. Modality check
        const isAsyncAllowed = rule.isAsyncPermittedForCategory[category];
        const allowedModality = isAsyncAllowed
            ? 'ASYNC_STORE_AND_FORWARD'
            : 'SYNCHRONOUS_AUDIO_VIDEO';
        return {
            isEligible: true,
            reasons,
            allowedModality,
            requiredDisclosures: rule.specificDisclosures,
        };
    }
    /**
     * Matches an eligible case to clinicians who hold active, verified licenses
     * in the patient's physical state.
     */
    static findQualifiedClinicians(patientPhysicalState, clinicianRoster, evaluationDate = new Date()) {
        const qualifiedClinicianIds = [];
        for (const clinician of clinicianRoster) {
            const activeStateLicense = clinician.licenses.find((lic) => lic.state === patientPhysicalState &&
                lic.isActive &&
                new Date(lic.expiresAt).getTime() > evaluationDate.getTime());
            if (activeStateLicense) {
                qualifiedClinicianIds.push(clinician.clinicianId);
            }
        }
        return qualifiedClinicianIds;
    }
}
//# sourceMappingURL=eligibility-validator.js.map