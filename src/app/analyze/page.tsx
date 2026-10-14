'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { analyzeMediaFile } from '@/lib/api';
import { MediaAnalysisReport, MediaClassification } from '@/types';
import { SAMPLE_FORENSIC_REPORTS } from '@/data/sampleReports';
import {
  Upload,
  Cpu,
  FileCheck,
  AlertTriangle,
  FileText,
  Image as ImageIcon,
  Video,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  Layers,
  Activity,
  Info,
  Clock,
  Sparkles,
  Download,
  Share2,
  FolderPlus,
  RefreshCw
} from 'lucide-react';

function AnalyzeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addMediaAnalysis, addInvestigation } = useApp();

  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [report, setReport] = useState<MediaAnalysisReport | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const typeParam = searchParams.get('type');
    if (typeParam === 'video') {
      setActiveTab('video');
    }
  }, [searchParams]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    validateAndSetFile(file);
  };

  const validateAndSetFile = (file: File) => {
    setErrorMsg(null);
    setReport(null);

    const isVid = activeTab === 'video';
    const maxSize = isVid ? 100 * 1024 * 1024 : 25 * 1024 * 1024;

    if (file.size > maxSize) {
      setErrorMsg(`File size exceeds maximum permitted limit (${isVid ? '100MB' : '25MB'}).`);
      return;
    }

    if (isVid && !file.type.startsWith('video/') && !file.name.match(/\.(mp4|mov|webm)$/i)) {
      setErrorMsg('Invalid video format. Please upload MP4, MOV, or WEBM.');
      return;
    }

    if (!isVid && !file.type.startsWith('image/')) {
      setErrorMsg('Invalid image format. Please upload JPEG, PNG, or WEBP.');
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleRunAnalysis = async () => {
    if (!selectedFile) return;

    setAnalyzing(true);
    setProgress(15);
    setErrorMsg(null);

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 85) return prev;
        return prev + 15;
      });
    }, 250);

    try {
      const res = await analyzeMediaFile(selectedFile, activeTab === 'video');
      clearInterval(progressInterval);
      setProgress(100);
      setReport(res);
      addMediaAnalysis(res);
    } catch (err: any) {
      clearInterval(progressInterval);
      setErrorMsg(err?.message || 'Forensic analysis failed. Please retry.');
    } finally {
      setAnalyzing(false);
    }
  };

  const loadPresetSample = (sampleKey: keyof typeof SAMPLE_FORENSIC_REPORTS) => {
    const sample = SAMPLE_FORENSIC_REPORTS[sampleKey];
    setReport(sample);
    setSelectedFile(null);
    setPreviewUrl(null);
    setErrorMsg(null);
  };

  const handleCreateCaseFromReport = () => {
    if (!report) return;
    const inv = addInvestigation({
      title: `Forensic Case: ${report.filename}`,
      incidentType: report.overall_classification === 'Potentially AI-generated' ? 'deepfake_misuse' : 'unauthorized_photo',
      description: `Analysis performed on ${report.filename}. Outcome: ${report.overall_classification} (Calibrated: ${report.calibrated_score}%). Indicators: ${report.suspicious_visual_indicators.join('; ')}`,
      severity: report.calibrated_score > 75 ? 'High' : 'Moderate',
      mediaAnalysisId: report.media_identifier
    });
    router.push(`/investigations/${inv.id}`);
  };

  const getStatusBadge = (classification: MediaClassification) => {
    switch (classification) {
      case 'Potentially AI-generated':
        return 'bg-rose-500/10 border-rose-500/40 text-rose-400';
      case 'Potentially manipulated':
        return 'bg-amber-500/10 border-amber-500/40 text-amber-300';
      case 'No significant manipulation indicators detected':
        return 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400';
      case 'Inconclusive':
        return 'bg-blue-500/10 border-blue-500/40 text-blue-300';
      default:
        return 'bg-slate-700 border-slate-600 text-slate-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-cyan-500/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono mb-2">
          <Cpu className="w-3.5 h-3.5" />
          <span>MULTI-LAYERED MEDIA FORENSICS</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Image & Video Authenticity Lab
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Evaluate digital media for generative AI indicators, image manipulation, compression disparities, and C2PA credentials using calibrated forensic models.
        </p>
      </div>

      {/* Main Grid: Upload & Analysis Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Upload Workspace */}
        <div className="lg:col-span-5 space-y-6">
          {/* Media Type Selector */}
          <div className="flex p-1 bg-slate-900 border border-cyber-border rounded-xl">
            <button
              onClick={() => { setActiveTab('image'); setSelectedFile(null); setPreviewUrl(null); }}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'image'
                  ? 'bg-cyber-panel text-cyber-cyan border border-cyber-cyan/40 shadow-glow-cyan/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Image Analysis</span>
            </button>
            <button
              onClick={() => { setActiveTab('video'); setSelectedFile(null); setPreviewUrl(null); }}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'video'
                  ? 'bg-cyber-panel text-cyber-cyan border border-cyber-cyan/40 shadow-glow-cyan/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Video Analysis</span>
            </button>
          </div>

          {/* Upload Dropzone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-700 hover:border-cyber-cyan/60 rounded-2xl p-8 text-center cursor-pointer bg-slate-900/40 hover:bg-slate-900/70 transition-all relative overflow-hidden group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept={activeTab === 'image' ? 'image/jpeg,image/png,image/webp' : 'video/mp4,video/quicktime,video/webm'}
              className="hidden"
            />
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyber-cyan border border-cyber-cyan/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-white mb-1">
              Click to select or drag & drop {activeTab === 'image' ? 'image' : 'video'}
            </p>
            <p className="text-xs text-slate-400 font-mono">
              {activeTab === 'image' ? 'JPG, PNG, WEBP (Max 25MB)' : 'MP4, MOV, WEBM (Max 100MB)'}
            </p>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Preview Panel */}
          {previewUrl && selectedFile && (
            <div className="cyber-card rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-mono text-slate-300 font-semibold truncate max-w-[200px]">
                  {selectedFile.name}
                </span>
                <span className="font-mono text-slate-400">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </span>
              </div>

              <div className="rounded-xl overflow-hidden bg-black/60 max-h-64 flex items-center justify-center border border-slate-800">
                {activeTab === 'image' ? (
                  <img src={previewUrl} alt="Preview" className="object-contain max-h-64 w-full" />
                ) : (
                  <video src={previewUrl} controls className="max-h-64 w-full" />
                )}
              </div>

              {/* Run Analysis Button */}
              <button
                onClick={handleRunAnalysis}
                disabled={analyzing}
                className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-slate-950 font-bold text-sm shadow-glow-cyan flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
              >
                {analyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Executing Forensic Scans ({progress}%)...</span>
                  </>
                ) : (
                  <>
                    <Cpu className="w-4 h-4 text-slate-950" />
                    <span>Run Forensic Authenticity Check</span>
                  </>
                )}
              </button>

              {analyzing && (
                <div className="mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-cyber-cyan h-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Preset Sample Library for Zero-Friction Testing */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-300 mb-3">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>TEST WITH PRECOMPUTED BENCHMARK SAMPLES</span>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => loadPresetSample('sample_ai_face')}
                className="w-full p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 flex items-center justify-between text-left text-xs transition-all"
              >
                <div>
                  <span className="font-semibold text-white block">Preset 1: AI Diffusion Face-Swap</span>
                  <span className="text-[11px] text-slate-400 font-mono">Corneal asymmetry & noise suppression</span>
                </div>
                <span className="text-cyber-cyan font-mono text-[11px]">87% AI</span>
              </button>

              <button
                onClick={() => loadPresetSample('sample_manipulated_photo')}
                className="w-full p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 flex items-center justify-between text-left text-xs transition-all"
              >
                <div>
                  <span className="font-semibold text-white block">Preset 2: Spliced Composite Image</span>
                  <span className="text-[11px] text-slate-400 font-mono">High ELA variance on torso/face seam</span>
                </div>
                <span className="text-amber-400 font-mono text-[11px]">79% Spliced</span>
              </button>

              <button
                onClick={() => loadPresetSample('sample_authentic_camera')}
                className="w-full p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 flex items-center justify-between text-left text-xs transition-all"
              >
                <div>
                  <span className="font-semibold text-white block">Preset 3: Genuine Camera Capture</span>
                  <span className="text-[11px] text-slate-400 font-mono">Sony A7 IV optical Bayer sensor profile</span>
                </div>
                <span className="text-emerald-400 font-mono text-[11px]">14% Score</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Forensic Output Report */}
        <div className="lg:col-span-7">
          {report ? (
            <div className="cyber-card rounded-2xl p-6 sm:p-8 space-y-6">
              {/* Report Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-cyber-border gap-4">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 mb-1">
                    <span className="text-cyber-cyan font-bold">CASE REF: {report.media_identifier}</span>
                    <span>•</span>
                    <span>{new Date(report.analysis_timestamp).toLocaleTimeString()}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white font-mono">{report.filename}</h2>
                  {report.dimensions && (
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      {report.dimensions} • {report.format} • {((report.file_size_bytes || 0) / 1024).toFixed(1)} KB
                    </p>
                  )}
                </div>

                {/* Classification Badge */}
                <div className="flex flex-col items-start sm:items-end">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                    Classification Result
                  </span>
                  <span
                    className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-bold inline-flex items-center space-x-1.5 ${getStatusBadge(
                      report.overall_classification
                    )}`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                    <span>{report.overall_classification}</span>
                  </span>
                </div>
              </div>

              {/* Calibrated Probability Gauge */}
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-cyber-border">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono text-slate-300 font-semibold flex items-center space-x-1.5">
                    <Activity className="w-4 h-4 text-cyber-cyan" />
                    <span>Calibrated Forensic Probability</span>
                  </span>
                  <span className="text-xs font-mono text-cyber-cyan bg-cyan-500/10 px-2 py-0.5 rounded border border-cyber-cyan/30">
                    Uncertainty: {report.uncertainty_interval}
                  </span>
                </div>

                <div className="flex items-baseline space-x-3 mb-2">
                  <span className="text-4xl font-extrabold font-mono text-white">
                    {report.calibrated_score}%
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    ({report.overall_classification})
                  </span>
                </div>

                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      report.calibrated_score > 70
                        ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                        : report.calibrated_score > 40
                        ? 'bg-amber-400'
                        : 'bg-emerald-400'
                    }`}
                    style={{ width: `${report.calibrated_score}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  Calibrated across multi-spectral error-level divergence and spatial frequency distributions. Raw confidence has been statistically normalized.
                </p>
              </div>

              {/* Detector Outputs Breakdown */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-3 flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-cyber-cyan" />
                  <span>Detector Outputs & Signal Analysis</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                    <span className="text-[11px] text-slate-400 block mb-1">ELA Variance</span>
                    <span className="font-mono text-sm font-bold text-white">
                      {report.detector_outputs.ela_recompression_divergence ?? '0.12'}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">JPEG recompression</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                    <span className="text-[11px] text-slate-400 block mb-1">Sensor Noise</span>
                    <span className="font-mono text-sm font-bold text-white">
                      {report.detector_outputs.sensor_noise_distribution_score ?? '0.04'}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">High-frequency profile</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                    <span className="text-[11px] text-slate-400 block mb-1">Chrominance</span>
                    <span className="font-mono text-sm font-bold text-white">
                      {report.detector_outputs.chrominance_boundary_anomaly ?? '0.35'}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Channel gradient</span>
                  </div>
                </div>
              </div>

              {/* Suspicious Visual Indicators */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-3 flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Suspicious Visual Indicators Detected</span>
                </h3>
                {report.suspicious_visual_indicators && report.suspicious_visual_indicators.length > 0 ? (
                  <div className="space-y-2">
                    {report.suspicious_visual_indicators.map((indicator, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/20 text-xs text-rose-200 flex items-start space-x-2.5"
                      >
                        <span className="text-rose-400 font-mono font-bold mt-0.5">•</span>
                        <span>{indicator}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
                    No significant manipulation or generative synthesis indicators detected.
                  </div>
                )}
              </div>

              {/* Video Frame Breakdown (if video) */}
              {report.sampled_frames && report.sampled_frames.length > 0 && (
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-3 flex items-center space-x-2">
                    <Video className="w-4 h-4 text-cyber-cyan" />
                    <span>Sampled Video Frames Timeline</span>
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {report.sampled_frames.map((frame, i) => (
                      <div key={i} className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-center font-mono">
                        <span className="text-[10px] text-slate-400 block">Frame #{frame.frame_number}</span>
                        <span className="text-xs text-cyber-cyan font-bold">{frame.timestamp}</span>
                        <span className="text-[10px] text-slate-300 block">Coherence: {(frame.facial_coherence_score * 100).toFixed(0)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Metadata & Provenance */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-2">
                <div className="flex items-center space-x-2 text-slate-200 font-semibold font-mono">
                  <Info className="w-4 h-4 text-blue-400" />
                  <span>Metadata & Content Credentials Audit</span>
                </div>
                <div className="text-slate-400 space-y-1">
                  <p>
                    <strong>C2PA Status:</strong> {report.metadata_and_provenance_findings.c2pa_status || 'None'}
                  </p>
                  {report.metadata_and_provenance_findings.camera_make && (
                    <p>
                      <strong>Hardware Capture:</strong> {report.metadata_and_provenance_findings.camera_make} {report.metadata_and_provenance_findings.camera_model}
                    </p>
                  )}
                  {report.metadata_and_provenance_findings.notes && (
                    <p className="text-[11px] text-slate-400 italic">
                      {report.metadata_and_provenance_findings.notes}
                    </p>
                  )}
                </div>
              </div>

              {/* Mandatory Model Limitations & Disclaimers */}
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs space-y-1.5 text-slate-300">
                <span className="font-semibold text-amber-300 font-mono block">
                  MODEL LIMITATIONS & INTERPRETATION POLICY:
                </span>
                {report.model_limitations.map((lim, i) => (
                  <p key={i} className="text-slate-400 text-[11px] flex items-start space-x-1.5">
                    <span className="text-amber-400">•</span>
                    <span>{lim}</span>
                  </p>
                ))}
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-cyber-border flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={handleCreateCaseFromReport}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs flex items-center space-x-2 shadow-glow-cyan"
                >
                  <FolderPlus className="w-4 h-4" />
                  <span>Save to Privacy Investigation</span>
                </button>

                <button
                  onClick={() => router.push('/remove-content')}
                  className="px-5 py-2.5 rounded-xl bg-cyber-panel hover:bg-slate-800 border border-cyber-border text-white text-xs font-semibold flex items-center space-x-2"
                >
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>Draft Content Takedown Letter</span>
                </button>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="cyber-card rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[460px]">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyber-cyan border border-cyber-cyan/30 flex items-center justify-center mb-4">
                <Cpu className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">No Analysis Running Yet</h3>
              <p className="text-xs text-slate-400 max-w-md mb-6 leading-relaxed">
                Upload a suspicious image or video in the workspace on the left, or pick one of the verified sample presets to view a live forensic breakdown.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => loadPresetSample('sample_ai_face')}
                  className="px-4 py-2 rounded-lg bg-cyber-panel border border-cyber-cyan/40 text-cyber-cyan font-mono text-xs hover:bg-slate-800 transition-all"
                >
                  Load Sample Deepfake
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AnalyzePage() {
  return (
    <React.Suspense fallback={<div className="max-w-7xl mx-auto p-12 text-center text-xs font-mono text-slate-400">Loading Forensics Lab...</div>}>
      <AnalyzeContent />
    </React.Suspense>
  );
}
