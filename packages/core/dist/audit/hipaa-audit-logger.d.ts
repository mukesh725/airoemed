import { HIPAAPhiAuditEntry } from '@airo/types';
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
export declare class HASTAuditLogger {
    /**
     * Hashes an IP address using SHA-256 with salt to prevent direct PII leak
     * in audit databases while maintaining cryptographic non-repudiation.
     */
    static hashIpAddress(ip: string, salt?: string): string;
    /**
     * Sanitizes generic payload objects, stripping sensitive tokens,
     * passwords, credit cards, and raw SSNs.
     */
    static sanitizeForTelemetry(data: Record<string, unknown>): Record<string, unknown>;
    /**
     * Constructs an immutable HIPAA PHI audit entry.
     */
    static createAuditEntry(payload: AuditLogPayload): HIPAAPhiAuditEntry;
}
//# sourceMappingURL=hipaa-audit-logger.d.ts.map