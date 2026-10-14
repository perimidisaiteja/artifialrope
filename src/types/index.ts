export type IncidentType =
  | 'unauthorized_photo'
  | 'deepfake_misuse'
  | 'impersonation'
  | 'doxxing'
  | 'ncii'
  | 'harassment'
  | 'sensitive_documents'
  | 'search_exposure'
  | 'other';

export type RemovalStatus =
  | 'Draft'
  | 'Ready to submit'
  | 'Submitted by user'
  | 'Submission confirmed through authorized integration'
  | 'Awaiting platform response'
  | 'Additional information requested'
  | 'Removed, as reported by user'
  | 'Removal independently verified'
  | 'Rejected'
  | 'Escalation needed'
  | 'Closed';

export type MediaClassification =
  | 'Potentially manipulated'
  | 'Potentially AI-generated'
  | 'No significant manipulation indicators detected'
  | 'Inconclusive'
  | 'Analysis failed';

export interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  isGuest: boolean;
  apiKey?: string;
  retentionDays: number;
  anonymizeData: boolean;
}

export interface PlatformInfo {
  id: string;
  name: string;
  category: string;
  verified_reporting_url: string;
  impersonation_url?: string;
  privacy_complaint_url?: string;
  ncii_partner?: string;
  last_verified_at: string;
  verification_status: string;
  supported_categories: string[];
  escalation_route: string;
  steps: string[];
}

export interface MediaAnalysisReport {
  media_identifier: string;
  analysis_timestamp: string;
  analysis_duration_seconds?: number;
  filename: string;
  media_type: 'image' | 'video';
  dimensions?: string;
  format?: string;
  file_size_bytes?: number;
  file_sha256?: string;
  checks_performed: string[];
  overall_classification: MediaClassification;
  calibrated_score: number;
  uncertainty_interval: string;
  confidence_display?: string;
  detector_outputs: {
    ai_generation_indicator_score?: number;
    manipulation_indicator_score?: number;
    ela_recompression_divergence?: number;
    sensor_noise_distribution_score?: number;
    chrominance_boundary_anomaly?: number;
    temporal_jitter_index?: number;
    facial_warp_probability?: number;
    [key: string]: any;
  };
  sampled_frames?: Array<{
    frame_number: number;
    timestamp: string;
    facial_coherence_score: number;
    boundary_flicker_level: string;
  }>;
  suspicious_visual_indicators: string[];
  metadata_and_provenance_findings: {
    has_exif?: boolean;
    camera_make?: string | null;
    camera_model?: string | null;
    software?: string | null;
    ai_generator_detected?: boolean;
    detected_software?: string | null;
    c2pa_status?: string;
    raw_tags_count?: number;
    notes?: string;
    [key: string]: any;
  };
  model_limitations: string[];
  recommended_next_steps: string[];
}

export interface PrivacyAssessment {
  assessment_id: string;
  incident_category: IncidentType;
  category_title: string;
  legal_context: string;
  severity_level: 'Low' | 'Moderate' | 'High' | 'Critical';
  severity_score: number;
  is_emergency_concern: boolean;
  danger_signals_detected: string[];
  immediate_safety_steps: string[];
  evidence_preservation_guidelines: string[];
  transparent_limitations: string;
  suggested_action: string;
}

export interface EvidenceItem {
  id: string;
  investigationId?: string;
  filename: string;
  contentType: string;
  fileSizeBytes: number;
  retentionDeadline: string;
  sha256Hash: string;
  redacted: boolean;
  previewUrl?: string;
  createdAt: string;
  notes?: string;
}

export interface RemovalRequest {
  id: string;
  investigationId: string;
  platform: string;
  platformName: string;
  incidentType: IncidentType;
  reportingUrl: string;
  contentUrl: string;
  accountHandle?: string;
  editableDraft: string;
  status: RemovalStatus;
  externalReference?: string;
  notes?: string;
  reminderDate?: string;
  lastUpdatedAt: string;
  createdAt: string;
}

export interface Investigation {
  id: string;
  userId: string;
  title: string;
  incidentType: IncidentType;
  platform: string;
  contentUrl: string;
  description: string;
  severity: 'Low' | 'Moderate' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Escalated' | 'Resolved' | 'Closed';
  createdAt: string;
  updatedAt: string;
  mediaAnalysisId?: string;
  removalRequestId?: string;
  evidenceCount: number;
  timeline: Array<{
    id: string;
    timestamp: string;
    title: string;
    description: string;
    type: 'created' | 'status_change' | 'evidence_added' | 'draft_generated' | 'submitted' | 'note';
  }>;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  source?: string;
  suggested_actions?: string[];
}
