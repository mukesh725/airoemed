const BASE_PHASE1_RULES = {
    TX: {
        stateCode: 'TX',
        stateName: 'Texas',
        isPhase1LaunchState: true,
        isAsyncPermittedForCategory: {
            HAIR_LOSS: true,
            SEXUAL_HEALTH_ED: true,
            DERMATOLOGY: true,
            WEIGHT_MANAGEMENT: true,
        },
        requiresIdVerificationBeforeReview: true,
        minimumAgeRequirement: {
            HAIR_LOSS: 18,
            SEXUAL_HEALTH_ED: 21,
            DERMATOLOGY: 18,
            WEIGHT_MANAGEMENT: 18,
        },
        imlcParticipant: true,
        specificDisclosures: [
            'Texas Medical Board Chapter 174: Telemedicine services establish a valid patient-physician relationship.',
            'Emergency notice: If you are experiencing a medical emergency, call 911 immediately.',
            'Complaints may be filed with the Texas Medical Board.',
        ],
    },
    FL: {
        stateCode: 'FL',
        stateName: 'Florida',
        isPhase1LaunchState: true,
        isAsyncPermittedForCategory: {
            HAIR_LOSS: true,
            SEXUAL_HEALTH_ED: true,
            DERMATOLOGY: true,
            WEIGHT_MANAGEMENT: true,
        },
        requiresIdVerificationBeforeReview: true,
        minimumAgeRequirement: {
            HAIR_LOSS: 18,
            SEXUAL_HEALTH_ED: 21,
            DERMATOLOGY: 18,
            WEIGHT_MANAGEMENT: 18,
        },
        imlcParticipant: true,
        specificDisclosures: [
            'Florida Telehealth Act Section 456.47: Asynchronous store-and-forward is permitted if standard of care is met.',
            'Florida Department of Health telehealth provider registration verified.',
        ],
    },
    GA: {
        stateCode: 'GA',
        stateName: 'Georgia',
        isPhase1LaunchState: true,
        isAsyncPermittedForCategory: {
            HAIR_LOSS: true,
            SEXUAL_HEALTH_ED: true,
            DERMATOLOGY: true,
            WEIGHT_MANAGEMENT: true,
        },
        requiresIdVerificationBeforeReview: true,
        minimumAgeRequirement: {
            HAIR_LOSS: 18,
            SEXUAL_HEALTH_ED: 21,
            DERMATOLOGY: 18,
            WEIGHT_MANAGEMENT: 18,
        },
        imlcParticipant: true,
        specificDisclosures: [
            'Georgia Composite Medical Board Rule 360-3-.07 compliant.',
        ],
    },
    AZ: {
        stateCode: 'AZ',
        stateName: 'Arizona',
        isPhase1LaunchState: true,
        isAsyncPermittedForCategory: {
            HAIR_LOSS: true,
            SEXUAL_HEALTH_ED: true,
            DERMATOLOGY: true,
            WEIGHT_MANAGEMENT: true,
        },
        requiresIdVerificationBeforeReview: true,
        minimumAgeRequirement: {
            HAIR_LOSS: 18,
            SEXUAL_HEALTH_ED: 21,
            DERMATOLOGY: 18,
            WEIGHT_MANAGEMENT: 18,
        },
        imlcParticipant: true,
        specificDisclosures: [
            'Arizona Revised Statutes Title 36 Chapter 36 telehealth provisions apply.',
        ],
    },
    CO: {
        stateCode: 'CO',
        stateName: 'Colorado',
        isPhase1LaunchState: true,
        isAsyncPermittedForCategory: {
            HAIR_LOSS: true,
            SEXUAL_HEALTH_ED: true,
            DERMATOLOGY: true,
            WEIGHT_MANAGEMENT: true,
        },
        requiresIdVerificationBeforeReview: true,
        minimumAgeRequirement: {
            HAIR_LOSS: 18,
            SEXUAL_HEALTH_ED: 21,
            DERMATOLOGY: 18,
            WEIGHT_MANAGEMENT: 18,
        },
        imlcParticipant: true,
        specificDisclosures: [
            'Colorado Medical Board Policy 40-03 compliant.',
        ],
    },
    IL: {
        stateCode: 'IL',
        stateName: 'Illinois',
        isPhase1LaunchState: true,
        isAsyncPermittedForCategory: {
            HAIR_LOSS: true,
            SEXUAL_HEALTH_ED: true,
            DERMATOLOGY: true,
            WEIGHT_MANAGEMENT: true,
        },
        requiresIdVerificationBeforeReview: true,
        minimumAgeRequirement: {
            HAIR_LOSS: 18,
            SEXUAL_HEALTH_ED: 21,
            DERMATOLOGY: 18,
            WEIGHT_MANAGEMENT: 18,
        },
        imlcParticipant: true,
        specificDisclosures: [
            'Illinois Telehealth Act (225 ILCS 150/) compliant.',
        ],
    },
    OH: {
        stateCode: 'OH',
        stateName: 'Ohio',
        isPhase1LaunchState: true,
        isAsyncPermittedForCategory: {
            HAIR_LOSS: true,
            SEXUAL_HEALTH_ED: true,
            DERMATOLOGY: true,
            WEIGHT_MANAGEMENT: true,
        },
        requiresIdVerificationBeforeReview: true,
        minimumAgeRequirement: {
            HAIR_LOSS: 18,
            SEXUAL_HEALTH_ED: 21,
            DERMATOLOGY: 18,
            WEIGHT_MANAGEMENT: 18,
        },
        imlcParticipant: true,
        specificDisclosures: [
            'State Medical Board of Ohio Telehealth Rules OAC 4731-11-09 compliant.',
        ],
    },
    PA: {
        stateCode: 'PA',
        stateName: 'Pennsylvania',
        isPhase1LaunchState: true,
        isAsyncPermittedForCategory: {
            HAIR_LOSS: true,
            SEXUAL_HEALTH_ED: true,
            DERMATOLOGY: true,
            WEIGHT_MANAGEMENT: true,
        },
        requiresIdVerificationBeforeReview: true,
        minimumAgeRequirement: {
            HAIR_LOSS: 18,
            SEXUAL_HEALTH_ED: 21,
            DERMATOLOGY: 18,
            WEIGHT_MANAGEMENT: 18,
        },
        imlcParticipant: true,
        specificDisclosures: [
            'Pennsylvania State Board of Medicine standard-of-care guidelines apply.',
        ],
    },
    NC: {
        stateCode: 'NC',
        stateName: 'North Carolina',
        isPhase1LaunchState: true,
        isAsyncPermittedForCategory: {
            HAIR_LOSS: true,
            SEXUAL_HEALTH_ED: true,
            DERMATOLOGY: true,
            WEIGHT_MANAGEMENT: true,
        },
        requiresIdVerificationBeforeReview: true,
        minimumAgeRequirement: {
            HAIR_LOSS: 18,
            SEXUAL_HEALTH_ED: 21,
            DERMATOLOGY: 18,
            WEIGHT_MANAGEMENT: 18,
        },
        imlcParticipant: true, // Joined IMLC Jan 2026
        specificDisclosures: [
            'North Carolina Medical Board Telemedicine Position Statement compliant.',
        ],
    },
    WA: {
        stateCode: 'WA',
        stateName: 'Washington',
        isPhase1LaunchState: true,
        isAsyncPermittedForCategory: {
            HAIR_LOSS: true,
            SEXUAL_HEALTH_ED: true,
            DERMATOLOGY: true,
            WEIGHT_MANAGEMENT: true,
        },
        requiresIdVerificationBeforeReview: true,
        minimumAgeRequirement: {
            HAIR_LOSS: 18,
            SEXUAL_HEALTH_ED: 21,
            DERMATOLOGY: 18,
            WEIGHT_MANAGEMENT: 18,
        },
        imlcParticipant: true,
        specificDisclosures: [
            'Washington Medical Commission Telemedicine Guidance compliant.',
            'Washington My Health My Data Act: We do not sell or share consumer health data with third-party advertisers.',
        ],
    },
};
function buildAllStateRules() {
    const allStates = [
        'TX', 'FL', 'GA', 'AZ', 'CO', 'IL', 'OH', 'PA', 'NC', 'WA',
        'AL', 'AK', 'AR', 'CA', 'CT', 'DE', 'HI', 'ID', 'IN', 'IA',
        'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO',
        'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'ND', 'OK', 'OR',
        'RI', 'SC', 'SD', 'TN', 'UT', 'VT', 'VA', 'WV', 'WI', 'WY', 'DC'
    ];
    const map = {};
    for (const st of allStates) {
        if (st in BASE_PHASE1_RULES) {
            map[st] = BASE_PHASE1_RULES[st];
        }
        else {
            map[st] = {
                stateCode: st,
                stateName: st,
                isPhase1LaunchState: false,
                isAsyncPermittedForCategory: {
                    HAIR_LOSS: false,
                    SEXUAL_HEALTH_ED: false,
                    DERMATOLOGY: false,
                    WEIGHT_MANAGEMENT: false,
                },
                requiresIdVerificationBeforeReview: true,
                minimumAgeRequirement: {
                    HAIR_LOSS: 18,
                    SEXUAL_HEALTH_ED: 21,
                    DERMATOLOGY: 18,
                    WEIGHT_MANAGEMENT: 18,
                },
                imlcParticipant: st !== 'MI', // MI left IMLC in March 2026
                specificDisclosures: ['Telehealth service coming soon to this state.'],
            };
        }
    }
    return map;
}
export const STATE_TELEHEALTH_RULES = buildAllStateRules();
//# sourceMappingURL=state-rules.js.map