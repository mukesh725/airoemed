import * as crypto from 'node:crypto';

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

export class EncounterLockService {
  /**
   * Cryptographically signs and locks a completed clinical encounter.
   * After locking, direct mutation of the encounter is illegal.
   */
  public static signAndLockEncounter(
    encounter: EncounterData,
    signingClinicianId: string,
    secretKey: string = 'airo-clinician-signing-key-2026'
  ): EncounterData {
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
  public static appendAddendum(
    encounter: EncounterData,
    clinicianId: string,
    addendumText: string
  ): AddendumRecord {
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
  public static assertEncounterUnlocked(encounter: EncounterData): void {
    if (encounter.isLocked) {
      throw new Error(
        'MedicalRecordIntegrityError: Encounter is permanently locked per state medical board regulations. Addenda must be used.'
      );
    }
  }
}
