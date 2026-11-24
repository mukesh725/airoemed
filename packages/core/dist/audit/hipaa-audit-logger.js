import * as crypto from 'node:crypto';
export class HASTAuditLogger {
    /**
     * Hashes an IP address using SHA-256 with salt to prevent direct PII leak
     * in audit databases while maintaining cryptographic non-repudiation.
     */
    static hashIpAddress(ip, salt = 'airo-phi-salt-2026') {
        return crypto.createHmac('sha256', salt).update(ip).digest('hex');
    }
    /**
     * Sanitizes generic payload objects, stripping sensitive tokens,
     * passwords, credit cards, and raw SSNs.
     */
    static sanitizeForTelemetry(data) {
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
        const sanitized = {};
        for (const [key, value] of Object.entries(data)) {
            const lowerKey = key.toLowerCase();
            if (sensitiveKeys.some((s) => lowerKey.includes(s))) {
                sanitized[key] = '[REDACTED_HIPAA_SECURE]';
            }
            else if (typeof value === 'object' && value !== null) {
                sanitized[key] = this.sanitizeForTelemetry(value);
            }
            else {
                sanitized[key] = value;
            }
        }
        return sanitized;
    }
    /**
     * Constructs an immutable HIPAA PHI audit entry.
     */
    static createAuditEntry(payload) {
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
//# sourceMappingURL=hipaa-audit-logger.js.map