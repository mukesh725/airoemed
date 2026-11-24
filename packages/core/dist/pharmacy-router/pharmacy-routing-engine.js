export class PharmacyRoutingEngine {
    /**
     * Evaluates a signed prescription and routes it to the legal, licensed fulfillment channel.
     */
    static routePrescription(medication, destinationState, availablePharmacies) {
        // 1. Regulatory Hard Stop: Reject any attempt to compound GLP-1s in v1
        if (medication.category === 'WEIGHT_MANAGEMENT' &&
            medication.type === 'COMPOUNDED_503A') {
            return {
                success: false,
                route: 'MAIL_ORDER_503A_PARTNER',
                drugCostUSD: 0,
                careMembershipFeeUSD: 0,
                totalPatientBilledUSD: 0,
                isColdChainRequired: false,
                error: 'Regulatory Violation: Compounded GLP-1 medications are strictly prohibited in AIRO eMed US v1.',
            };
        }
        // 2. Weight Management: Route branded GLP-1s directly to manufacturer self-pay channels
        if (medication.category === 'WEIGHT_MANAGEMENT') {
            const lowerName = medication.displayName.toLowerCase();
            let route = 'LILLY_DIRECT_API';
            let manufacturerName = 'LillyDirect (Eli Lilly)';
            if (lowerName.includes('wegovy') || lowerName.includes('novocare')) {
                route = 'NOVO_CARE_API';
                manufacturerName = 'NovoCare (Novo Nordisk)';
            }
            const careMembershipFeeUSD = 79.0;
            const drugCostUSD = medication.monthlyRetailPriceUSD; // Pass-through manufacturer self-pay price
            return {
                success: true,
                route,
                assignedPharmacyName: manufacturerName,
                drugCostUSD,
                careMembershipFeeUSD,
                totalPatientBilledUSD: careMembershipFeeUSD + drugCostUSD,
                isColdChainRequired: true,
            };
        }
        // 3. Hair Loss, ED, Dermatology: 503A or Standard Generic Mail-Order
        const eligiblePharmacies = availablePharmacies.filter((pharmacy) => {
            const hasStateLicense = pharmacy.licensedStates.includes(destinationState);
            if (!hasStateLicense)
                return false;
            if (medication.type === 'COMPOUNDED_503A') {
                return pharmacy.is503ACompounding;
            }
            return true;
        });
        if (eligiblePharmacies.length === 0) {
            return {
                success: false,
                route: 'MAIL_ORDER_503A_PARTNER',
                drugCostUSD: 0,
                careMembershipFeeUSD: 0,
                totalPatientBilledUSD: 0,
                isColdChainRequired: false,
                error: `No partner pharmacy currently holds an active non-resident dispensing permit in ${destinationState} for this medication type.`,
            };
        }
        // Select the fastest dispensing licensed partner
        const selectedPharmacy = eligiblePharmacies.sort((a, b) => a.averageDispenseHours - b.averageDispenseHours)[0];
        const bundledMonthlyFee = medication.monthlyRetailPriceUSD;
        return {
            success: true,
            route: 'MAIL_ORDER_503A_PARTNER',
            assignedPharmacyId: selectedPharmacy?.id,
            assignedPharmacyName: selectedPharmacy?.name,
            drugCostUSD: 0, // Bundled into total membership
            careMembershipFeeUSD: bundledMonthlyFee,
            totalPatientBilledUSD: bundledMonthlyFee,
            isColdChainRequired: false,
        };
    }
    /**
     * Generates discrete shipping instructions ensuring no condition or medication
     * name appears on external labeling.
     */
    static generateDiscreetPackagingManifest(_order) {
        return {
            senderDisplayName: 'Fulfillment Logistics Center',
            outerBoxType: 'Plain unmarked corrugated brown box',
            containsConditionOnLabel: false,
        };
    }
}
//# sourceMappingURL=pharmacy-routing-engine.js.map