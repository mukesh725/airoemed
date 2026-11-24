export class SubscriptionEngine {
    /**
     * Initializes a pending subscription at intake checkout.
     * Payment is pre-authorized only; funds are NOT captured until clinical approval.
     */
    static createPendingSubscription(patientId, plan, startDate = new Date()) {
        const periodEnd = new Date(startDate);
        periodEnd.setDate(periodEnd.getDate() + plan.intervalDays);
        const renewalNotice = new Date(periodEnd);
        renewalNotice.setHours(renewalNotice.getHours() - 72);
        return {
            id: `sub_${Math.random().toString(36).substring(2, 11)}`,
            patientId,
            planId: plan.id,
            status: 'PENDING_CLINICAL_APPROVAL',
            currentPeriodStart: startDate,
            currentPeriodEnd: periodEnd,
            renewalNoticeScheduledDate: renewalNotice,
            cardAuthorizedOnly: true,
        };
    }
    /**
     * Activates the subscription and captures payment upon clinician prescription signature.
     */
    static activateOnPrescriptionApproval(subscription) {
        return {
            ...subscription,
            status: 'ACTIVE',
            cardAuthorizedOnly: false,
        };
    }
    /**
     * Cancels subscription immediately without retention walls, conforming
     * strictly to the FTC "Click to Cancel" Negative-Option mandate.
     */
    static cancelSubscription(subscription, reason) {
        return {
            ...subscription,
            status: 'CANCELLED',
            cancellationDate: new Date(),
            cancellationReason: reason || 'Self-serve 1-click patient cancellation',
        };
    }
    /**
     * Pauses recurring billing and shipments for a specified duration (30, 60, or 90 days).
     */
    static pauseSubscription(subscription, pauseDays) {
        const pausedUntil = new Date();
        pausedUntil.setDate(pausedUntil.getDate() + pauseDays);
        const updatedEnd = new Date(subscription.currentPeriodEnd);
        updatedEnd.setDate(updatedEnd.getDate() + pauseDays);
        return {
            ...subscription,
            status: 'PAUSED',
            pausedUntilDate: pausedUntil,
            currentPeriodEnd: updatedEnd,
        };
    }
    /**
     * Verifies if a renewal reminder notification must be dispatched today.
     */
    static shouldSendRenewalNotice(subscription, today = new Date()) {
        if (subscription.status !== 'ACTIVE')
            return false;
        return today.getTime() >= subscription.renewalNoticeScheduledDate.getTime() &&
            today.getTime() < subscription.currentPeriodEnd.getTime();
    }
}
//# sourceMappingURL=subscription-engine.js.map