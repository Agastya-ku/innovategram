export type Language = 'en' | 'hi' | 'gu';

export type Sector =
  | 'Agriculture'
  | 'Water and Sanitation'
  | 'Renewable Energy'
  | 'Healthcare'
  | 'Education'
  | 'Manufacturing'
  | 'Environment'
  | 'Waste Management'
  | 'Transportation'
  | 'Rural Livelihoods'
  | 'Construction'
  | 'Assistive Technology'
  | 'Other';

export type Stage =
  | 'Idea'
  | 'Prototype'
  | 'Tested'
  | 'Validated'
  | 'Adopted'
  | 'Scaled';

export type VerificationStatus =
  | 'Pending Review'
  | 'Under Review'
  | 'Verified'
  | 'Needs More Info'
  | 'Rejected';

export interface MediaItem {
  id: string;
  type: 'photo' | 'video' | 'audio';
  url: string;
  caption?: string;
}

export interface LocationInfo {
  state: string;
  district: string;
  villageOrTown: string;
  lat: number;
  lng: number;
  isApproximate?: boolean;
}

export interface Innovation {
  id: string; // e.g., IG-2026-001025
  title: Record<Language, string>;
  problem: Record<Language, string>;
  solution: Record<Language, string>;
  originalLanguage: Language;
  originalTranscript: string;
  audioUrl?: string;
  media: MediaItem[];
  sector: Sector;
  subsector?: string;
  stage: Stage;
  status: VerificationStatus;
  location: LocationInfo;
  registrationType?: 'self' | 'assisted';
  submitterName?: string;
  submitterRelationship?: string;
  submitterPhoneMasked?: string;
  innovatorConsentGiven?: boolean;
  innovatorName?: string;
  innovatorContactProtected: boolean;
  innovatorPhoneMasked?: string;
  innovatorPhone?: string;
  submissionDate: string;
  submissionType: 'voice' | 'photo' | 'video' | 'text' | 'combined';
  aiConfidenceScore: number;
  keywords: string[];
  potentialApplications: string[];
  isSampleData: boolean;
  verificationNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface StakeholderReview {
  id: string;
  innovationId: string;
  reviewerName: string;
  reviewerOrg: string;
  reviewerRole:
    | 'Administrator'
    | 'Government department'
    | 'Incubator'
    | 'University'
    | 'NGO'
    | 'Manufacturer'
    | 'Research institution';
  status: VerificationStatus;
  comments: string;
  date: string;
}

export interface ConnectionRequest {
  id: string;
  innovationId: string;
  innovationTitle: string;
  stakeholderName: string;
  organization: string;
  stakeholderRole: string;
  stakeholderEmail: string;
  stakeholderPhone: string;
  purpose:
    | 'Incubation'
    | 'Funding'
    | 'Manufacturing'
    | 'Testing & Validation'
    | 'Procurement'
    | 'Research Collaboration';
  message: string;
  status: 'Pending Innovator Consent' | 'Approved' | 'Declined';
  createdAt: string;
}

export interface TranslationDictionary {
  [key: string]: Record<Language, string>;
}

