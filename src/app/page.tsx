'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Cpu,
  FileSearch,
  MessageSquare,
  FileText,
  Lock,
  EyeOff,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Sliders,
  Database,
  ExternalLink,
  ChevronRight,
  Fingerprint,
  Activity,
  Layers,
  Terminal
} from 'lucide-react';
import { SAMPLE_FORENSIC_REPORTS } from '@/data/sampleReports';

export default function HomePage() {
  const [selectedDemoKey, setSelectedDemoKey] = useState<'sample_ai_face' | 'sample_manipulated_photo' | 'sample_authentic_camera'>('sample_ai_face');
  const demoReport = SAMPLE_FORENSIC_REPORTS[selectedDemoKey];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Banner Status Bar */}
      <div className="bg-[#060a17] border-b border-cyber-border/40 py-1.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">TRUTHLENS FORENSICS NETWORK: ONLINE</span>
          </div>
          <div className="hidden sm:flex items-center space-x-4 text-slate-400">
            <span>ZERO-RETENTION ACTIVE</span>
            <span>C2PA / METADATA AUDIT</span>
            <span className="text-cyber-cyan">PROBABILISTIC ACCURACY VERIFIED</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden border-b border-cyber-border/30">
        <div className="absolute inset-0 bg-cyber-grid bg-[size:30px_30px] opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-cyan-500/10 to-violet-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyber-panel border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono font-medium mb-8 shadow-glow-cyan/20">
            <Shield className="w-3.5 h-3.5" />
            <span>Digital Privacy Guardian & Media Authenticity Lab</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Your Face. <span className="cyber-gradient-text">Your Data.</span> <br className="hidden sm:block" />
            Your Rights.
          </h1>

          {/* Supporting Statement */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 mb-10 leading-relaxed">
            Detect suspicious digital media, protect your personal information, and take informed action against unauthorized online content.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mb-16">
            <Link
              href="/analyze"
              className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-glow-cyan hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Cpu className="w-4 h-4 text-slate-950" />
              <span>Analyze an Image</span>
            </Link>

            <Link
              href="/analyze?type=video"
              className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-cyber-panel hover:bg-slate-800 text-white border border-cyber-cyan/40 font-semibold text-sm hover:border-cyber-cyan transition-all"
            >
              <Activity className="w-4 h-4 text-cyber-cyan" />
              <span>Analyze a Video</span>
            </Link>

            <Link
              href="/privacy-check"
              className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-cyber-panel hover:bg-slate-800 text-white border border-slate-700 font-semibold text-sm hover:border-violet-500/60 transition-all"
            >
              <FileSearch className="w-4 h-4 text-violet-400" />
              <span>Protect My Privacy</span>
            </Link>

            <Link
              href="/guardian"
              className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 font-medium text-sm transition-all"
            >
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>Talk to Guardian AI</span>
            </Link>
          </div>

          {/* Architectural Safeguards Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center space-x-2 text-cyber-cyan text-xs font-mono mb-1">
                <Fingerprint className="w-3.5 h-3.5" />
                <span>Multi-Forensics</span>
              </div>
              <p className="text-xs text-slate-400">ELA, spectral noise & C2PA credential audits</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-mono mb-1">
                <Lock className="w-3.5 h-3.5" />
                <span>Zero Training</span>
              </div>
              <p className="text-xs text-slate-400">Your uploads are never used to train AI models</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center space-x-2 text-violet-400 text-xs font-mono mb-1">
                <FileText className="w-3.5 h-3.5" />
                <span>Official Takedowns</span>
              </div>
              <p className="text-xs text-slate-400">Verified platform links & customized legal drafts</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono mb-1">
                <EyeOff className="w-3.5 h-3.5" />
                <span>Private Vault</span>
              </div>
              <p className="text-xs text-slate-400">Configurable retention with 1-click total purge</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live-Style Interactive Media Analysis Demonstration */}
      <section className="py-20 bg-[#060a17] border-b border-cyber-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-cyan-500/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono mb-3">
              <Activity className="w-3.5 h-3.5" />
              <span>LIVE DEMO WITH VERIFIED SAMPLE DATA</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">
              Forensic Authenticity Analysis in Action
            </h2>
            <p className="text-sm text-slate-400">
              Explore how TruthLens evaluates digital assets across multiple layers of forensic indicators. Select a sample below to inspect real calibrated scores, detector outputs, and limitations.
            </p>

            {/* Demo Sample Switcher */}
            <div className="mt-6 flex flex-wrap justify-center gap-2 p-1.5 bg-slate-900/90 rounded-xl border border-slate-800 w-fit mx-auto">
              <button
                onClick={() => setSelectedDemoKey('sample_ai_face')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedDemoKey === 'sample_ai_face'
                    ? 'bg-cyber-cyan text-slate-950 font-bold shadow-glow-cyan/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                Sample 1: AI Diffusion Face-Swap
              </button>
              <button
                onClick={() => setSelectedDemoKey('sample_manipulated_photo')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedDemoKey === 'sample_manipulated_photo'
                    ? 'bg-cyber-cyan text-slate-950 font-bold shadow-glow-cyan/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                Sample 2: Spliced Composite Image
              </button>
              <button
                onClick={() => setSelectedDemoKey('sample_authentic_camera')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedDemoKey === 'sample_authentic_camera'
                    ? 'bg-cyber-cyan text-slate-950 font-bold shadow-glow-cyan/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                Sample 3: Authentic Camera Capture
              </button>
            </div>
          </div>

          {/* Forensic HUD Display */}
          <div className="cyber-card rounded-2xl p-6 lg:p-8 max-w-5xl mx-auto scanline-effect">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-cyber-border gap-4">
              <div>
                <div className="flex items-center space-x-3 mb-1">
                  <span className="font-mono text-xs text-cyber-cyan font-bold">{demoReport.media_identifier}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 border border-slate-700 text-slate-300">
                    SAMPLE PRESET
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{demoReport.dimensions}</span>
                </div>
                <h3 className="text-lg font-bold text-white font-mono">{demoReport.filename}</h3>
              </div>

              {/* Classification Badge */}
              <div className="text-right">
                <span className="text-xs font-mono text-slate-400 block mb-1">DETERMINED OUTCOME</span>
                <div
                  className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg font-mono text-xs font-bold border ${
                    demoReport.overall_classification === 'Potentially AI-generated'
                      ? 'bg-rose-500/10 border-rose-500/40 text-rose-400'
                      : demoReport.overall_classification === 'Potentially manipulated'
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                      : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                  <span>{demoReport.overall_classification}</span>
                </div>
              </div>
            </div>

            {/* Calibration & Gauges Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b border-cyber-border">
              {/* Gauge 1 */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex justify-between items-center text-xs text-slate-400 font-mono mb-2">
                  <span>CALIBRATED PROBABILITY</span>
                  <span className="text-cyber-cyan">{demoReport.uncertainty_interval}</span>
                </div>
                <div className="text-3xl font-extrabold font-mono text-white mb-2">
                  {demoReport.calibrated_score}%
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      demoReport.calibrated_score > 70 ? 'bg-gradient-to-r from-amber-500 to-rose-500' : 'bg-emerald-400'
                    }`}
                    style={{ width: `${demoReport.calibrated_score}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  Statistically bound probability index with uncertainty interval.
                </p>
              </div>

              {/* Gauge 2 */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex justify-between items-center text-xs text-slate-400 font-mono mb-2">
                  <span>ERROR LEVEL ANALYSIS (ELA)</span>
                  <span className="text-slate-300">{demoReport.detector_outputs.ela_recompression_divergence}</span>
                </div>
                <div className="text-2xl font-bold font-mono text-white mb-2">
                  {(demoReport.detector_outputs.ela_recompression_divergence ?? 0) > 0.4 ? 'Elevated Divergence' : 'Uniform Grid'}
                </div>
                <p className="text-[11px] text-slate-400">
                  Calculates compression history variance across JPEG block boundaries.
                </p>
              </div>

              {/* Gauge 3 */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex justify-between items-center text-xs text-slate-400 font-mono mb-2">
                  <span>PROVENANCE & C2PA</span>
                  <span className="text-slate-300">{demoReport.metadata_and_provenance_findings.c2pa_status}</span>
                </div>
                <div className="text-sm font-semibold text-white mb-2">
                  {demoReport.metadata_and_provenance_findings.camera_make
                    ? `Captured with ${demoReport.metadata_and_provenance_findings.camera_make} ${demoReport.metadata_and_provenance_findings.camera_model || ''}`
                    : 'No Hardware EXIF Tags Present'}
                </div>
                <p className="text-[11px] text-slate-400">
                  {demoReport.metadata_and_provenance_findings.notes}
                </p>
              </div>
            </div>

            {/* Suspicious Indicators & Limitations */}
            <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Detected Forensic Indicators</span>
                </h4>
                {demoReport.suspicious_visual_indicators.length > 0 ? (
                  <ul className="space-y-2 text-xs text-slate-300">
                    {demoReport.suspicious_visual_indicators.map((ind, i) => (
                      <li key={i} className="flex items-start space-x-2 p-2 rounded bg-slate-900/40 border border-slate-800/80">
                        <span className="text-cyber-cyan font-mono font-bold">•</span>
                        <span>{ind}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-3 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
                    No significant anomalies or synthetic markers were detected in this sample.
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-cyber-cyan" />
                  <span>Model Limitations & Next Actions</span>
                </h4>
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs space-y-2 text-slate-400">
                  <p className="text-slate-300 font-medium">
                    &ldquo;No significant indicators&rdquo; is never treated as proof of authenticity.
                  </p>
                  <p>
                    Detection remains probabilistic. For actionable resolution:
                  </p>
                  <Link
                    href="/remove-content"
                    className="inline-flex items-center space-x-1.5 text-cyber-cyan font-semibold hover:underline"
                  >
                    <span>Proceed to Content Removal Workflow</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How TruthLens AI Works */}
      <section className="py-20 border-b border-cyber-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              How TruthLens AI Works
            </h2>
            <p className="text-sm text-slate-400">
              A four-pillar system built to guide everyday users from initial suspicion to verified takedown and resolution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-cyber-panel border border-cyber-border relative group hover:border-cyber-cyan/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan mb-4 font-mono font-bold text-lg">
                01
              </div>
              <h3 className="text-base font-bold text-white mb-2">Authenticity Lab</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Upload image or video files to inspect Error Level Analysis (ELA), camera metadata, high-frequency noise profiles, and generative signatures.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-cyber-panel border border-cyber-border relative group hover:border-cyber-cyan/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 mb-4 font-mono font-bold text-lg">
                02
              </div>
              <h3 className="text-base font-bold text-white mb-2">Privacy Triage</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Document privacy violations (unauthorized photos, impersonation, doxxing, NCII) and receive a calibrated severity score and immediate safety advice.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-cyber-panel border border-cyber-border relative group hover:border-cyber-cyan/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 font-mono font-bold text-lg">
                03
              </div>
              <h3 className="text-base font-bold text-white mb-2">Guardian AI Guidance</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Consult our conversational assistant for platform-specific reporting instructions, safe evidence preservation, and redaction guidance.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-cyber-panel border border-cyber-border relative group hover:border-cyber-cyan/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 font-mono font-bold text-lg">
                04
              </div>
              <h3 className="text-base font-bold text-white mb-2">Official Takedowns</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Generate tailored, factual removal letters and submit directly via verified official platform reporting links with case tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Capabilities Cards */}
      <section className="py-20 bg-[#060a17] border-b border-cyber-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Comprehensive Privacy Defense Capabilities
            </h2>
            <p className="text-sm text-slate-400">
              Designed for creators, students, professionals, and anyone concerned with unauthorized use of their likeness or identity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="cyber-card rounded-2xl p-7 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 text-cyber-cyan flex items-center justify-center mb-5 border border-cyber-cyan/40">
                  <Fingerprint className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">AI Deepfake & Tamper Detection</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Multi-spectral forensic evaluation detects digital face-swaps, synthetic diffusion artifacts, compression splicing, and missing hardware signatures.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-300 font-mono">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyber-cyan" />
                    <span>Error Level Analysis (ELA)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyber-cyan" />
                    <span>High-frequency noise consistency</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyber-cyan" />
                    <span>C2PA Content Credentials audit</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/analyze"
                className="mt-6 flex items-center space-x-2 text-xs font-bold text-cyber-cyan hover:underline"
              >
                <span>Launch Media Lab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="cyber-card rounded-2xl p-7 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-violet-500/20 text-violet-400 flex items-center justify-center mb-5 border border-violet-500/40">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">Digital Privacy Risk Triage</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Assess potential violations including doxxing, unauthorized personal photographs, non-consensual imagery, and impersonation profiles.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-300 font-mono">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" />
                    <span>Severity scoring with limitations</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" />
                    <span>Immediate emergency safety steps</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" />
                    <span>Safe evidence redaction protocols</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/privacy-check"
                className="mt-6 flex items-center space-x-2 text-xs font-bold text-violet-400 hover:underline"
              >
                <span>Assess Incident Risk</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="cyber-card rounded-2xl p-7 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5 border border-emerald-500/40">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">Guided Content Removal</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Step-by-step workflow with verified official platform links, factual complaint generators, and case lifecycle tracking.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-300 font-mono">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>8 distinct legal letter templates</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Direct links to official forms</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Case milestones & follow-up tracking</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/remove-content"
                className="mt-6 flex items-center space-x-2 text-xs font-bold text-emerald-400 hover:underline"
              >
                <span>Start Removal Workflow</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy-First Architecture Section */}
      <section className="py-20 border-b border-cyber-border/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-3xl bg-cyber-panel border border-cyber-cyan/30 shadow-glow-cyan/10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 pb-8 border-b border-cyber-border">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-cyan-500/10 text-cyber-cyan text-xs font-mono mb-2">
                  <Lock className="w-3.5 h-3.5" />
                  <span>PRIVACY-FIRST DESIGN</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Engineered for Absolute Confidentiality</h2>
              </div>
              <div className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-2 rounded-lg border border-slate-800">
                SSRF-PROTECTED • ZERO MODEL TRAINING
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
              <div className="space-y-2">
                <h4 className="font-semibold text-white flex items-center space-x-1.5 font-mono">
                  <Database className="w-4 h-4 text-cyber-cyan" />
                  <span>Controlled Retention</span>
                </h4>
                <p className="text-slate-400 leading-relaxed">
                  Your evidence files have automatic retention expiration deadlines and can be completely wiped from disk and local memory with a single click.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-white flex items-center space-x-1.5 font-mono">
                  <EyeOff className="w-4 h-4 text-violet-400" />
                  <span>No Model Training</span>
                </h4>
                <p className="text-slate-400 leading-relaxed">
                  Sensitive images, screenshots, and descriptions uploaded by users are never fed into AI foundation models or distributed in public galleries.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-white flex items-center space-x-1.5 font-mono">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>No False Promises</span>
                </h4>
                <p className="text-slate-400 leading-relaxed">
                  We never claim that detection is 100% conclusive or that complaints have been submitted when only external links were visited.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-center relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Take Control of Your Online Privacy Today
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto mb-8">
            Whether you are investigating suspicious media or fighting unauthorized publication, TruthLens AI provides the tools and clarity you need.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/privacy-check"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-slate-950 font-bold text-sm shadow-glow-cyan transition-all"
            >
              Start a Privacy Investigation
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-medium text-sm transition-all"
            >
              Open User Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
