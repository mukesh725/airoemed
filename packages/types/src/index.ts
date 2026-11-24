/**
 * AIRO eMed US — Core Type Definitions
 * Strict clinical and architectural domain definitions.
 */

export type USStateCode =
  | 'TX' | 'FL' | 'GA' | 'AZ' | 'CO' | 'IL' | 'OH' | 'PA' | 'NC' | 'WA' // Phase 1 Launch States
  | 'AL' | 'AK' | 'AR' | 'CA' | 'CT' | 'DE' | 'HI' | 'ID' | 'IN' | 'IA'
  | 'KS' | 'KY' | 'LA' | 'ME' | 'MD' | 'MA' | 'MI' | 'MN' | 'MS' | 'MO'
  | 'MT' | 'NE' | 'NV' | 'NH' | 'NJ' | 'NM' | 'NY' | 'ND' | 'OK' | 'OR'
  | 'RI' | 'SC' | 'SD' | 'TN' | 'UT' | 'VT' | 'VA' | 'WV' | 'WI' | 'WY' | 'DC';

export type ClinicalCategory =
  | 'HAIR_LOSS'
  | 'SEXUAL_HEALTH_ED'
  | 'DERMATOLOGY'
  | 'WEIGHT_MANAGEMENT';

export type TelehealthModality =
  | 'ASYNC_STORE_AND_FORWARD'
  | 'SYNCHRONOUS_AUDIO_VIDEO';

export type EncounterStatus =
  | 'INTAKE_IN_PROGRESS'
  | 'INTAKE_SUBMITTED'
  | 'CDSS_EVALUATED'
  | 'DECLINED_CONTRAINDICATED'
  | 'PENDING_CLINICIAN_REVIEW'
  | 'VIDEO_CONSULT_REQUIRED'
  | 'VIDEO_CONSULT_SCHEDULED'
  | 'APPROVED_SIGNED'
  | 'LOCKED'
  | 'CANCELLED';

export type MedicationType =
  | 'FDA_APPROVED_GENERIC'
  | 'COMPOUNDED_503A'
  | 'MANUFACTURER_DIRECT_BRANDED';

export type PharmacyFulfillmentRoute =
  | 'MAIL_ORDER_503A_PARTNER'
  | 'LILLY_DIRECT_API'
  | 'NOVO_CARE_API';

export type CDSSSeverity =
  | 'CRITICAL_HARD_STOP'
  | 'WARNING_CLINICIAN_CONFIRMATION'
  | 'INFO';

export interface CDSSFinding {
  ruleId: string;
  category: ClinicalCategory;
  severity: CDSSSeverity;
  ruleTitle: string;
  clinicalExplanation: string;
  evidenceReference: string;
  actionRequired: 'REJECT_APPLICATION' | 'FORCE_VIDEO_CONSULT' | 'REQUIRE_CLINICIAN_OVERRIDE_REASON';
}

export interface CDSSEvaluationResult {
  hasHardStop: boolean;
  canProceedToReview: boolean;
  findings: CDSSFinding[];
  recommendedModality: TelehealthModality;
}

export interface StateTelehealthRule {
  stateCode: USStateCode;
  stateName: string;
  isPhase1LaunchState: boolean;
  isAsyncPermittedForCategory: Record<ClinicalCategory, boolean>;
  requiresIdVerificationBeforeReview: boolean;
  minimumAgeRequirement: Record<ClinicalCategory, number>;
  imlcParticipant: boolean;
  specificDisclosures: string[];
}

export interface ClinicianLicense {
  licenseId: string;
  clinicianId: string;
  state: USStateCode;
  licenseNumber: string;
  licenseType: 'MD' | 'DO' | 'NP' | 'PA';
  isActive: boolean;
  lastVerifiedAt: Date;
  expiresAt: Date;
  imlcCompactIssued: boolean;
}

export interface PatientProfile {
  id: string;
  email: string;
  phone: string;
  dateOfBirth: string; // YYYY-MM-DD
  stateOfResidence: USStateCode;
  currentPhysicalState: USStateCode;
  biologicalSex: 'MALE' | 'FEMALE';
  idvStatus: 'NOT_STARTED' | 'PENDING' | 'VERIFIED' | 'FAILED';
  createdAt: Date;
}

export interface MedicationItem {
  id: string;
  ndcOrCompoundCode: string;
  displayName: string;
  category: ClinicalCategory;
  type: MedicationType;
  strength: string;
  dosageForm: string; // e.g. "Oral Tablet", "Topical Solution"
  defaultDaysSupply: number;
  monthlyRetailPriceUSD: number;
  isManufacturerPassThrough: boolean;
  partnerPharmacyIds: string[];
}

export interface PrescriptionOrder {
  id: string;
  encounterId: string;
  patientId: string;
  clinicianId: string;
  medication: MedicationItem;
  quantity: number;
  refillsAllowed: number;
  sigDirections: string;
  route: PharmacyFulfillmentRoute;
  prescribedAt: Date;
  signedDigitally: boolean;
  surescriptsTransactionId?: string;
  status: 'PENDING_ROUTING' | 'DISPATCHED_TO_PHARMACY' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
}

export interface HIPAAPhiAuditEntry {
  id: string;
  timestamp: Date;
  userId: string;
  userRole: 'PATIENT' | 'CLINICIAN' | 'CARE_COORDINATOR' | 'SYSTEM_CRON';
  action: 'READ' | 'CREATE' | 'UPDATE' | 'EXPORT' | 'DISCLOSE';
  resourceType: 'ENCOUNTER' | 'PRESCRIPTION' | 'INTAKE_PHOTOS' | 'PATIENT_PROFILE';
  resourceId: string;
  patientId: string;
  ipAddressHash: string; // Anonymized/hashed for security
  accessReason: string;
}
