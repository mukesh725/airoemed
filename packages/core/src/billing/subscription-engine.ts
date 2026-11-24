export interface SubscriptionPlan {
  id: string;
  name: string;
  intervalDays: number; // 30 (monthly) or 90 (quarterly)
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
  renewalNoticeScheduledDate: Date; // 72 hours before renewal
  pausedUntilDate?: Date;
  cancellationDate?: Date;
  cancellationReason?: string;
  cardAuthorizedOnly: boolean;
}

export class SubscriptionEngine {
  /**
   * Initializes a pending subscription at intake checkout.
   * Payment is pre-authorized only; funds are NOT captured until clinical approval.
   */
  public static createPendingSubscription(
    patientId: string,
    plan: SubscriptionPlan,
    startDate: Date = new Date()
  ): SubscriptionRecord {
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
  public static activateOnPrescriptionApproval(
    subscription: SubscriptionRecord
  ): SubscriptionRecord {
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
  public static cancelSubscription(
    subscription: SubscriptionRecord,
    reason?: string
  ): SubscriptionRecord {
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
  public static pauseSubscription(
    subscription: SubscriptionRecord,
    pauseDays: 30 | 60 | 90
  ): SubscriptionRecord {
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
  public static shouldSendRenewalNotice(
    subscription: SubscriptionRecord,
    today: Date = new Date()
  ): boolean {
    if (subscription.status !== 'ACTIVE') return false;
    return today.getTime() >= subscription.renewalNoticeScheduledDate.getTime() &&
      today.getTime() < subscription.currentPeriodEnd.getTime();
  }
}
