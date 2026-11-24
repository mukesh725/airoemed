import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { EncounterLockService } from '../dist/index.js';

describe('EncounterLockService — Medical Record Integrity', () => {
  it('successfully locks an open encounter with a valid cryptographic signature', () => {
    const draftEncounter = {
      id: 'enc_001',
      patientId: 'pat_999',
      clinicalNotes: 'Intake answers and clinical history reviewed. Sildenafil 50mg approved.',
      isLocked: false,
    };

    const locked = EncounterLockService.signAndLockEncounter(draftEncounter, 'doc_dr_jones');
    assert.strictEqual(locked.isLocked, true);
    assert.strictEqual(locked.clinicianId, 'doc_dr_jones');
    assert.ok(locked.signedAt);
    assert.ok(locked.digitalSignatureHash);
  });

  it('prohibits direct modifications to a locked encounter', () => {
    const lockedEncounter = {
      id: 'enc_001',
      patientId: 'pat_999',
      clinicalNotes: 'Initial notes',
      isLocked: true,
      signedAt: new Date(),
      digitalSignatureHash: 'hash123',
    };

    assert.throws(() => {
      EncounterLockService.assertEncounterUnlocked(lockedEncounter);
    }, /MedicalRecordIntegrityError/);
  });

  it('allows attaching an addendum to a locked encounter without modifying original chart', () => {
    const lockedEncounter = {
      id: 'enc_001',
      patientId: 'pat_999',
      clinicalNotes: 'Original prescription approved.',
      isLocked: true,
      signedAt: new Date(),
      digitalSignatureHash: 'hash123',
    };

    const addendum = EncounterLockService.appendAddendum(
      lockedEncounter,
      'doc_dr_jones',
      'Follow-up message sent to patient regarding taking medication 1 hour prior to sexual activity.'
    );

    assert.ok(addendum.id);
    assert.strictEqual(addendum.encounterId, 'enc_001');
    assert.strictEqual(addendum.clinicianId, 'doc_dr_jones');
    assert.ok(addendum.addendumText.includes('Follow-up message'));
  });
});
