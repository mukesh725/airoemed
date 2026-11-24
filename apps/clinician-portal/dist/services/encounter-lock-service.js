import * as crypto from 'node:crypto';
export class EncounterLockService {
    /**
     * Cryptographically signs and locks a completed clinical encounter.
     * After locking, direct mutation of the encounter is illegal.
     */
    static signAndLockEncounter(encounter, signingClinicianId, secretKey = 'airo-clinician-signing-key-2026') {
        if (encounter.isLocked) {
            throw new Error('ClinicalSafetyError: Cannot re-sign an already locked encounter.');
        }
        const signedAt = new Date();
        const dataToSign = `${encounter.id}|${encounter.patientId}|${signingClinicianId}|${signedAt.toISOString()}|${encounter.clinicalNotes || ''}`;
        const digitalSignatureHash = crypto
            .createHmac('sha256', secretKey)
            .update(dataToSign)
            .digest('hex');
        return {
            ...encounter,
            clinicianId: signingClinicianId,
            isLocked: true,
            signedAt,
            digitalSignatureHash,
        };
    }
    /**
     * Appends a formal clinical addendum to a locked chart.
     */
    static appendAddendum(encounter, clinicianId, addendumText) {
        if (!encounter.isLocked) {
            throw new Error('ClinicalWorkflowError: Addenda can only be attached to signed, locked encounters.');
        }
        return {
            id: crypto.randomUUID(),
            encounterId: encounter.id,
            clinicianId,
            addendumText,
            createdAt: new Date(),
        };
    }
    /**
     * Guard function: verifies encounter is not locked before allowing any modifications.
     */
    static assertEncounterUnlocked(encounter) {
        if (encounter.isLocked) {
            throw new Error('MedicalRecordIntegrityError: Encounter is permanently locked per state medical board regulations. Addenda must be used.');
        }
    }
}
//# sourceMappingURL=encounter-lock-service.js.map