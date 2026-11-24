export interface SubscriptionPlan {
    id: string;
    name: string;
    intervalDays: number;
    amountUSD: number;
    isPassThroughDrugIncluded: boolean;
    cancelAnytimeNoticeText: string;
}
export interface SubscriptionRecord {
    id: string;
    patientId: string;
    planId: string;
    status: 'ACTIVE' | 'PAUSED' | 'CANCELLED' | 'PENDING_CLINICAL_APPROVAL';
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
    renewalNoticeScheduledDate: Date;
    pausedUntilDate?: Date;
    cancellationDate?: Date;
    cancellationReason?: string;
    cardAuthorizedOnly: boolean;
}
export declare class SubscriptionEngine {
    /**
     * Initializes a pending subscription at intake checkout.
     * Payment is pre-authorized only; funds are NOT captured until clinical approval.
     */
    static createPendingSubscription(patientId: string, plan: SubscriptionPlan, startDate?: Date): SubscriptionRecord;
    /**
     * Activates the subscription and captures payment upon clinician prescription signature.
     */
    static activateOnPrescriptionApproval(subscription: SubscriptionRecord): SubscriptionRecord;
    /**
     * Cancels subscription immediately without retention walls, conforming
     * strictly to the FTC "Click to Cancel" Negative-Option mandate.
     */
    static cancelSubscription(subscription: SubscriptionRecord, reason?: string): SubscriptionRecord;
    /**
     * Pauses recurring billing and shipments for a specified duration (30, 60, or 90 days).
     */
    static pauseSubscription(subscription: SubscriptionRecord, pauseDays: 30 | 60 | 90): SubscriptionRecord;
    /**
     * Verifies if a renewal reminder notification must be dispatched today.
     */
    static shouldSendRenewalNotice(subscription: SubscriptionRecord, today?: Date): boolean;
}
//# sourceMappingURL=subscription-engine.d.ts.map