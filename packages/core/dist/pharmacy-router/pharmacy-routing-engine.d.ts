import { MedicationItem, PharmacyFulfillmentRoute, PrescriptionOrder, USStateCode } from '@airo/types';
export interface PharmacyPartner {
    id: string;
    name: string;
    is503ACompounding: boolean;
    licensedStates: USStateCode[];
    supportsColdChain: boolean;
    averageDispenseHours: number;
}
export interface RoutingDecision {
    success: boolean;
    route: PharmacyFulfillmentRoute;
    assignedPharmacyId?: string;
    assignedPharmacyName?: string;
    drugCostUSD: number;
    careMembershipFeeUSD: number;
    totalPatientBilledUSD: number;
    isColdChainRequired: boolean;
    error?: string;
}
export declare class PharmacyRoutingEngine {
    /**
     * Evaluates a signed prescription and routes it to the legal, licensed fulfillment channel.
     */
    static routePrescription(medication: MedicationItem, destinationState: USStateCode, availablePharmacies: PharmacyPartner[]): RoutingDecision;
    /**
     * Generates discrete shipping instructions ensuring no condition or medication
     * name appears on external labeling.
     */
    static generateDiscreetPackagingManifest(_order: PrescriptionOrder): {
        senderDisplayName: string;
        outerBoxType: string;
        containsConditionOnLabel: boolean;
    };
}
//# sourceMappingURL=pharmacy-routing-engine.d.ts.map