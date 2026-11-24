export interface EncounterData {
    id: string;
    patientId: string;
    clinicianId?: string;
    clinicalNotes?: string;
    isLocked: boolean;
    signedAt?: Date;
    digitalSignatureHash?: string;
}
export interface AddendumRecord {
    id: string;
    encounterId: string;
    clinicianId: string;
    addendumText: string;
    createdAt: Date;
}
export declare class EncounterLockService {
    /**
     * Cryptographically signs and locks a completed clinical encounter.
     * After locking, direct mutation of the encounter is illegal.
     */
    static signAndLockEncounter(encounter: EncounterData, signingClinicianId: string, secretKey?: string): EncounterData;
    /**
     * Appends a formal clinical addendum to a locked chart.
     */
    static appendAddendum(encounter: EncounterData, clinicianId: string, addendumText: string): AddendumRecord;
    /**
     * Guard function: verifies encounter is not locked before allowing any modifications.
     */
    static assertEncounterUnlocked(encounter: EncounterData): void;
}
//# sourceMappingURL=encounter-lock-service.d.ts.map