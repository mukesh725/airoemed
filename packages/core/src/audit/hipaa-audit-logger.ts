import { HIPAAPhiAuditEntry } from '@airo/types';
import * as crypto from 'node:crypto';

export interface AuditLogPayload {
  userId: string;
  userRole: 'PATIENT' | 'CLINICIAN' | 'CARE_COORDINATOR' | 'SYSTEM_CRON';
  action: 'READ' | 'CREATE' | 'UPDATE' | 'EXPORT' | 'DISCLOSE';
  resourceType: 'ENCOUNTER' | 'PRESCRIPTION' | 'INTAKE_PHOTOS' | 'PATIENT_PROFILE';
  resourceId: string;
  patientId: string;
  rawIpAddress: string;
  accessReason: string;
}

export class HASTAuditLogger {
  /**
   * Hashes an IP address using SHA-256 with salt to prevent direct PII leak
   * in audit databases while maintaining cryptographic non-repudiation.
   */
  public static hashIpAddress(ip: string, salt: string = 'airo-phi-salt-2026'): string {
    return crypto.createHmac('sha256', salt).update(ip).digest('hex');
  }

  /**
   * Sanitizes generic payload objects, stripping sensitive tokens,
   * passwords, credit cards, and raw SSNs.
   */
  public static sanitizeForTelemetry(data: Record<string, unknown>): Record<string, unknown> {
    const sensitiveKeys = [
      'password',
      'token',
      'authorization',
      'ssn',
      'socialsecurity',
      'creditcard',
      'cardnumber',
      'cvv',
      'cvc',
      'medicalhistory',
      'questionnaireanswers',
    ];

    const sanitized: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(data)) {
      const lowerKey = key.toLowerCase();
      if (sensitiveKeys.some((s) => lowerKey.includes(s))) {
        sanitized[key] = '[REDACTED_HIPAA_SECURE]';
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = this.sanitizeForTelemetry(value as Record<string, unknown>);
      } else {
        sanitized[key] = value;
      }
    }

    return sanitized;
  }

  /**
   * Constructs an immutable HIPAA PHI audit entry.
   */
  public static createAuditEntry(payload: AuditLogPayload): HIPAAPhiAuditEntry {
    const entryId = crypto.randomUUID();
    const timestamp = new Date();
    const ipAddressHash = this.hashIpAddress(payload.rawIpAddress);

    return {
      id: entryId,
      timestamp,
      userId: payload.userId,
      userRole: payload.userRole,
      action: payload.action,
      resourceType: payload.resourceType,
      resourceId: payload.resourceId,
      patientId: payload.patientId,
      ipAddressHash,
      accessReason: payload.accessReason,
    };
  }
}
