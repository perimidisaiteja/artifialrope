import { MediaAnalysisReport } from '@/types';

export const SAMPLE_FORENSIC_REPORTS: Record<string, MediaAnalysisReport> = {
  sample_ai_face: {
    media_identifier: "DEMO-SYNTH-8821a",
    analysis_timestamp: "2026-10-14T09:30:00Z",
    analysis_duration_seconds: 1.42,
    filename: "demo_sample_ai_portrait.png",
    media_type: "image",
    dimensions: "1024x1024",
    format: "PNG",
    file_size_bytes: 1845200,
    file_sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    checks_performed: [
      "Header & Container Integrity Check",
      "EXIF & Metadata Signature Audit",
      "Content Provenance & C2PA Credential Scan",
      "Compression Artifact & Error Level Analysis (ELA)",
      "High-Frequency Sensor Noise Uniformity Test",
      "Color Channel Boundary & Gradient Consistency Check"
    ],
    overall_classification: "Potentially AI-generated",
    calibrated_score: 87,
    uncertainty_interval: "±7%",
    confidence_display: "87% (Potentially AI-generated)",
    detector_outputs: {
      ai_generation_indicator_score: 0.88,
      manipulation_indicator_score: 0.35,
      ela_recompression_divergence: 0.12,
      sensor_noise_distribution_score: 0.04,
      chrominance_boundary_anomaly: 0.62
    },
    suspicious_visual_indicators: [
      "Synthetic generator signature detected: Uniform high-frequency sensor noise suppression typical of latent diffusion models.",
      "Asymmetric corneal reflection highlights between left and right iris structures.",
      "Unusual structural blending along hair-to-background transition boundaries."
    ],
    metadata_and_provenance_findings: {
      has_exif: false,
      c2pa_status: "No C2PA manifest found",
      notes: "Metadata contains no camera hardware tags (Make/Model). While common in social media uploads, noise profiling strongly aligns with synthetic image synthesis."
    },
    model_limitations: [
      "Detection algorithms are probabilistic and can produce false positives or false negatives.",
      "Raw confidence scores represent heuristic calibration across evaluated visual artifacts, not an absolute mathematical proof.",
      "This analysis is illustrative sample data provided for demonstration purposes."
    ],
    recommended_next_steps: [
      "If this depicts your identity without permission, navigate to 'Remove Content Online'.",
      "Do NOT re-circulate or repost this synthetic media publicly, as engagement amplifies online reach.",
      "Preserve the direct URL where this file was discovered."
    ]
  },

  sample_manipulated_photo: {
    media_identifier: "DEMO-MANIP-4412b",
    analysis_timestamp: "2026-10-14T09:31:00Z",
    analysis_duration_seconds: 1.15,
    filename: "demo_sample_spliced_scene.jpg",
    media_type: "image",
    dimensions: "1920x1080",
    format: "JPEG",
    file_size_bytes: 924510,
    file_sha256: "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4",
    checks_performed: [
      "Header & Container Integrity Check",
      "EXIF & Metadata Signature Audit",
      "Content Provenance & C2PA Credential Scan",
      "Compression Artifact & Error Level Analysis (ELA)",
      "High-Frequency Sensor Noise Uniformity Test",
      "Color Channel Boundary & Gradient Consistency Check"
    ],
    overall_classification: "Potentially manipulated",
    calibrated_score: 79,
    uncertainty_interval: "±8%",
    confidence_display: "79% (Potentially manipulated)",
    detector_outputs: {
      ai_generation_indicator_score: 0.30,
      manipulation_indicator_score: 0.82,
      ela_recompression_divergence: 0.58,
      sensor_noise_distribution_score: 0.64,
      chrominance_boundary_anomaly: 0.44
    },
    suspicious_visual_indicators: [
      "Localized compression divergence (ELA variance: 0.58): The facial region exhibits a different JPEG compression history than the surrounding torso.",
      "Sensor noise mismatch between foreground subject and background lighting conditions.",
      "Sharp edge gradients along collar boundary indicate localized image splicing or digital insertion."
    ],
    metadata_and_provenance_findings: {
      has_exif: true,
      camera_make: "Canon",
      camera_model: "EOS R5",
      software: "Adobe Photoshop 25.1 (Windows)",
      c2pa_status: "No C2PA manifest found",
      notes: "EXIF indicates editing software traces. Noticeable JPEG quantization disparities between image sections."
    },
    model_limitations: [
      "High ELA variance may also occur with intense legitimate localized image editing (contrast/dodge/burn).",
      "Classification is probabilistic; review source context before making formal legal declarations."
    ],
    recommended_next_steps: [
      "Check with the photographer or primary source for the raw unedited camera file.",
      "Document the URL and timestamp of publication.",
      "Use TruthLens Letter Generator if unauthorized composite likeness was published."
    ]
  },

  sample_authentic_camera: {
    media_identifier: "DEMO-AUTH-1109c",
    analysis_timestamp: "2026-10-14T09:32:00Z",
    analysis_duration_seconds: 0.98,
    filename: "demo_sample_genuine_capture.jpg",
    media_type: "image",
    dimensions: "4032x3024",
    format: "JPEG",
    file_size_bytes: 3410500,
    file_sha256: "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb",
    checks_performed: [
      "Header & Container Integrity Check",
      "EXIF & Metadata Signature Audit",
      "Content Provenance & C2PA Credential Scan",
      "Compression Artifact & Error Level Analysis (ELA)",
      "High-Frequency Sensor Noise Uniformity Test",
      "Color Channel Boundary & Gradient Consistency Check"
    ],
    overall_classification: "No significant manipulation indicators detected",
    calibrated_score: 14,
    uncertainty_interval: "±5%",
    confidence_display: "14% (No significant indicators)",
    detector_outputs: {
      ai_generation_indicator_score: 0.08,
      manipulation_indicator_score: 0.12,
      ela_recompression_divergence: 0.11,
      sensor_noise_distribution_score: 0.19,
      chrominance_boundary_anomaly: 0.09
    },
    suspicious_visual_indicators: [],
    metadata_and_provenance_findings: {
      has_exif: true,
      camera_make: "Sony",
      camera_model: "ILCE-7M4",
      software: "ILCE-7M4 v2.00",
      c2pa_status: "No C2PA manifest found",
      raw_tags_count: 38,
      notes: "Full camera hardware EXIF tags intact with consistent exposure times, lens focal length, and uniform optical sensor Bayer noise."
    },
    model_limitations: [
      "IMPORTANT: 'No significant manipulation indicators detected' DOES NOT constitute proof of authenticity.",
      "Sophisticated generative or editing techniques may not leave detectable traces at standard resolutions.",
      "Absence of evidence is not evidence of absence."
    ],
    recommended_next_steps: [
      "Content appears consistent with native camera sensor capture.",
      "Always verify provenance and trusted source origin."
    ]
  }
};
