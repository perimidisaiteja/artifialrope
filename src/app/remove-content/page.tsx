'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { PLATFORMS_DATA } from '@/data/platforms';
import { generateLetterDraft } from '@/lib/api';
import { IncidentType, PlatformInfo, RemovalStatus, RemovalRequest } from '@/types';
import {
  FileText,
  ShieldCheck,
  ExternalLink,
  Copy,
  Check,
  Download,
  AlertTriangle,
  Lock,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Send,
  Eye,
  Info,
  Clock,
  Sparkles,
  Calendar,
  HelpCircle
} from 'lucide-react';

function RemoveContentInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, createRemovalRequest, updateRemovalRequestStatus, addEvidenceItem } = useApp();

  // Workflow Step State (1 through 7)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form Data across steps
  const [incidentType, setIncidentType] = useState<IncidentType>('unauthorized_photo');
  const [selectedPlatformId, setSelectedPlatformId] = useState<string>('instagram');
  const [contentUrl, setContentUrl] = useState<string>('');
  const [accountHandle, setAccountHandle] = useState<string>('');
  const [isDepicted, setIsDepicted] = useState<boolean>(true);
  const [alreadyReported, setAlreadyReported] = useState<boolean>(false);
  const [incidentDescription, setIncidentDescription] = useState<string>('');
  const [fullName, setFullName] = useState<string>(user.displayName || 'Concerned Citizen');
  const [email, setEmail] = useState<string>(user.email || 'user@example.com');

  // Generated draft state
  const [generatedDraft, setGeneratedDraft] = useState<string>('');
  const [caseId, setCaseId] = useState<string>('');
  const [draftTitle, setDraftTitle] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [loadingDraft, setLoadingDraft] = useState<boolean>(false);

  // Case tracking state
  const [createdRequestId, setCreatedRequestId] = useState<string | null>(null);
  const [currentCaseStatus, setCurrentCaseStatus] = useState<RemovalStatus>('Ready to submit');
  const [submissionNotes, setSubmissionNotes] = useState<string>('');

  // Read URL query params if linked from elsewhere
  useEffect(() => {
    const p = searchParams.get('platform');
    const t = searchParams.get('type') as IncidentType;
    if (p) {
      const found = PLATFORMS_DATA.find((x) => x.id === p.toLowerCase() || x.name.toLowerCase() === p.toLowerCase());
      if (found) setSelectedPlatformId(found.id);
    }
    if (t) setIncidentType(t);
  }, [searchParams]);

  const selectedPlatform: PlatformInfo =
    PLATFORMS_DATA.find((p) => p.id === selectedPlatformId) || PLATFORMS_DATA[0];

  // Advance to draft generation at Step 5
  const handleProceedToStep5 = async () => {
    setCurrentStep(5);
    setLoadingDraft(true);
    try {
      const res = await generateLetterDraft({
        template_type: incidentType,
        full_name: fullName,
        email: email,
        content_url: contentUrl || 'https://[Insert-Content-URL-Here]',
        platform_name: selectedPlatform.name,
        account_handle: accountHandle || undefined,
        custom_details: incidentDescription || undefined
      });
      setGeneratedDraft(res.generated_draft);
      setCaseId(res.case_id);
      setDraftTitle(res.title);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingDraft(false);
    }
  };

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(generatedDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadDraft = () => {
    const blob = new Blob([generatedDraft], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TruthLens_Takedown_${caseId || 'Request'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleOpenPlatformUrl = () => {
    if (selectedPlatform?.verified_reporting_url) {
      window.open(selectedPlatform.verified_reporting_url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSaveAndTrack = () => {
    const newReq = createRemovalRequest({
      investigationId: caseId,
      platform: selectedPlatform.id,
      platformName: selectedPlatform.name,
      incidentType,
      reportingUrl: selectedPlatform.verified_reporting_url,
      contentUrl,
      accountHandle,
      editableDraft: generatedDraft,
      status: currentCaseStatus,
      notes: submissionNotes
    });
    setCreatedRequestId(newReq.id);
    setCurrentStep(7);
  };

  const handleUpdateStatus = (newStatus: RemovalStatus) => {
    setCurrentCaseStatus(newStatus);
    if (createdRequestId) {
      updateRemovalRequestStatus(createdRequestId, newStatus, submissionNotes);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-2">
          <FileText className="w-3.5 h-3.5" />
          <span>TAKEDOWN ORCHESTRATOR</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Remove Content Online
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          7-step guided takedown workflow with verified official platform links, customized factual drafts, safe evidence logging, and lifecycle tracking.
        </p>
      </div>

      {/* 7-Step Progress Stepper */}
      <div className="mb-8 p-3 bg-slate-900/80 border border-cyber-border rounded-2xl overflow-x-auto">
        <div className="flex items-center min-w-[680px] justify-between">
          {[
            { num: 1, label: 'Incident' },
            { num: 2, label: 'Platform' },
            { num: 3, label: 'Details' },
            { num: 4, label: 'Evidence' },
            { num: 5, label: 'Draft' },
            { num: 6, label: 'Submit' },
            { num: 7, label: 'Track' }
          ].map((s) => {
            const isCompleted = currentStep > s.num;
            const isCurrent = currentStep === s.num;
            return (
              <div key={s.num} className="flex items-center space-x-2">
                <button
                  onClick={() => s.num < currentStep && setCurrentStep(s.num)}
                  disabled={s.num > currentStep}
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-cyber-cyan text-slate-950 shadow-glow-cyan'
                      : isCompleted
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-500 border border-slate-700'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : s.num}
                </button>
                <span
                  className={`text-xs font-mono ${
                    isCurrent ? 'text-white font-bold' : isCompleted ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  {s.label}
                </span>
                {s.num < 7 && <ChevronRight className="w-3.5 h-3.5 text-slate-700 mx-1" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 1: SELECT INCIDENT */}
      {currentStep === 1 && (
        <div className="cyber-card rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white mb-1">Step 1 — Select the Incident Type</h2>
            <p className="text-xs text-slate-400">
              Choose the concern that best matches how your likeness or information was misused.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: 'unauthorized_photo', title: 'Unauthorized Personal Photo', desc: 'A real photo of you posted without permission.' },
              { id: 'deepfake_misuse', title: 'Deepfake or Manipulated Media', desc: 'AI face-swap or synthetic portrayal of your likeness.' },
              { id: 'impersonation', title: 'Impersonation or Fake Profile', desc: 'An account copying your identity or claiming to be you.' },
              { id: 'doxxing', title: 'Doxxing / Exposed Personal Info', desc: 'Home address, phone, email, or sensitive personal data.' },
              { id: 'ncii', title: 'Non-Consensual Intimate Imagery', desc: 'Intimate photos/videos shared without consent.' },
              { id: 'harassment', title: 'Harassment or Threats', desc: 'Targeted cyberbullying or harassment campaigns.' },
              { id: 'sensitive_documents', title: 'Sensitive Documents Exposure', desc: 'IDs, financial records, or medical records exposed.' },
              { id: 'search_exposure', title: 'Harmful Search Engine Exposure', desc: 'De-indexing request for Google or Bing search results.' }
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setIncidentType(cat.id as IncidentType)}
                className={`p-3.5 rounded-xl text-left border transition-all ${
                  incidentType === cat.id
                    ? 'bg-cyber-panel border-cyber-cyan text-white shadow-glow-cyan/20'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <span className="text-xs font-bold block mb-1 text-white">{cat.title}</span>
                <span className="text-[11px] text-slate-400 block">{cat.desc}</span>
              </button>
            ))}
          </div>

          <div className="flex justify-end pt-4 border-t border-cyber-border">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-6 py-2.5 rounded-xl bg-cyber-cyan text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center space-x-2 hover:bg-cyan-300 transition-all"
            >
              <span>Continue to Step 2</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: IDENTIFY PLATFORM */}
      {currentStep === 2 && (
        <div className="cyber-card rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white mb-1">Step 2 — Identify the Platform</h2>
            <p className="text-xs text-slate-400">
              Select the hosting provider. All platforms in TruthLens have verified official reporting URLs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PLATFORMS_DATA.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPlatformId(p.id)}
                className={`p-3.5 rounded-xl text-left border transition-all ${
                  selectedPlatformId === p.id
                    ? 'bg-cyber-panel border-cyber-cyan text-white shadow-glow-cyan/20'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white">{p.name}</span>
                  <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    VERIFIED
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 block font-mono">{p.category}</span>
              </button>
            ))}
          </div>

          {/* Selected Platform Summary */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white font-mono">{selectedPlatform.name} Reporting Destination:</span>
              <span className="text-[11px] text-slate-400 font-mono">Verified: {selectedPlatform.last_verified_at}</span>
            </div>
            <p className="text-cyber-cyan font-mono text-[11px] break-all">
              {selectedPlatform.verified_reporting_url}
            </p>
            <p className="text-slate-400 text-[11px]">
              Escalation route: {selectedPlatform.escalation_route}
            </p>
          </div>

          <div className="flex justify-between pt-4 border-t border-cyber-border">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 font-semibold text-xs border border-slate-800 flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="px-6 py-2.5 rounded-xl bg-cyber-cyan text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center space-x-2 hover:bg-cyan-300 transition-all"
            >
              <span>Continue to Step 3</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: COLLECT MINIMUM NECESSARY INFO */}
      {currentStep === 3 && (
        <div className="cyber-card rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white mb-1">Step 3 — Collect Minimum Necessary Information</h2>
            <p className="text-xs text-slate-400">
              TruthLens strictly requests only what is required to draft a factual removal notice. Never disclose passwords or private authentication codes.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-1">
                Content or Profile URL
              </label>
              <input
                type="url"
                required
                placeholder="https://platform.com/p/..."
                value={contentUrl}
                onChange={(e) => setContentUrl(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan font-mono"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-1">
                  Offending Account Handle (if known)
                </label>
                <input
                  type="text"
                  placeholder="@username"
                  value={accountHandle}
                  onChange={(e) => setAccountHandle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-1">
                  Your Full Legal Name (for Notice Sign-off)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jane Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-1">
                  Your Contact Email (for platform replies)
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan font-mono"
                />
              </div>

              <div className="flex flex-col justify-end">
                <label className="flex items-center space-x-2 cursor-pointer pb-2">
                  <input
                    type="checkbox"
                    checked={alreadyReported}
                    onChange={(e) => setAlreadyReported(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-cyber-cyan focus:ring-0"
                  />
                  <span className="text-xs text-slate-300">
                    I have already submitted an in-app report that was ignored or rejected.
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-1">
                Brief Description of the Harm / Depiction
              </label>
              <textarea
                rows={3}
                placeholder="Factual context: Explain that you did not authorize this media or that your likeness is altered..."
                value={incidentDescription}
                onChange={(e) => setIncidentDescription(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan leading-relaxed"
              />
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-cyber-border">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 font-semibold text-xs border border-slate-800 flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="px-6 py-2.5 rounded-xl bg-cyber-cyan text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center space-x-2 hover:bg-cyan-300 transition-all"
            >
              <span>Continue to Step 4</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: PRESERVE EVIDENCE SAFELY */}
      {currentStep === 4 && (
        <div className="cyber-card rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white mb-1">Step 4 — Preserve Evidence Safely</h2>
            <p className="text-xs text-slate-400">
              Crucial instructions on documenting evidence before platforms or bad actors delete or alter the offending material.
            </p>
          </div>

          {/* Warning Banner */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-2">
            <div className="flex items-center space-x-2 font-bold font-mono">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>CRITICAL EVIDENCE SAFETY WARNING:</span>
            </div>
            <ul className="space-y-1 list-disc list-inside text-[11px] text-amber-300/90 leading-relaxed">
              <li>DO NOT re-post or circulate the infringing media on your personal accounts to ask for advice.</li>
              <li>REDAC T any third-party faces, personal telephone numbers, or children&rsquo;s details from screenshots before saving.</li>
              <li>Keep an offline copy of screenshots in your encrypted device storage.</li>
            </ul>
          </div>

          {/* Checklist */}
          <div className="space-y-2.5">
            <span className="text-xs font-mono uppercase text-slate-300 font-semibold block">
              Evidence Preservation Checklist:
            </span>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-300">1. Full post URL with canonical parameters</span>
              <span className="text-emerald-400 font-mono text-[11px]">Recorded</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-300">2. Timestamp and uploader username</span>
              <span className="text-emerald-400 font-mono text-[11px]">Recorded</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-300">3. Screenshot of full webpage context (redacted)</span>
              <span className="text-cyber-cyan font-mono text-[11px]">Recommended</span>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-cyber-border">
            <button
              onClick={() => setCurrentStep(3)}
              className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 font-semibold text-xs border border-slate-800 flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={handleProceedToStep5}
              className="px-6 py-2.5 rounded-xl bg-cyber-cyan text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center space-x-2 hover:bg-cyan-300 transition-all"
            >
              <span>Generate Removal Draft</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: GENERATE REMOVAL REQUEST DRAFT */}
      {currentStep === 5 && (
        <div className="cyber-card rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-cyber-border gap-2">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Step 5 — Review & Edit Removal Notice Draft</h2>
              <p className="text-xs text-slate-400">
                A factual, formal request tailored to {selectedPlatform.name}. You can edit any section directly before copying.
              </p>
            </div>
            <div className="text-xs font-mono text-cyber-cyan bg-cyan-500/10 px-2.5 py-1 rounded border border-cyber-cyan/30 self-start sm:self-auto">
              REF: {caseId || 'GENERATED'}
            </div>
          </div>

          {loadingDraft ? (
            <div className="py-12 text-center text-xs text-slate-400 font-mono">
              Drafting factual legal notice...
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400 uppercase">Editable Letter Content:</span>
                <div className="flex space-x-2">
                  <button
                    onClick={handleCopyDraft}
                    className="flex items-center space-x-1.5 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition-all"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                    <span>{copied ? 'Copied' : 'Copy Notice'}</span>
                  </button>
                  <button
                    onClick={handleDownloadDraft}
                    className="flex items-center space-x-1.5 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition-all"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                    <span>Download TXT</span>
                  </button>
                </div>
              </div>

              <textarea
                rows={14}
                value={generatedDraft}
                onChange={(e) => setGeneratedDraft(e.target.value)}
                className="w-full bg-[#03060f] border border-slate-700 rounded-xl p-4 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyber-cyan leading-relaxed"
              />
            </div>
          )}

          <div className="flex justify-between pt-4 border-t border-cyber-border">
            <button
              onClick={() => setCurrentStep(4)}
              className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 font-semibold text-xs border border-slate-800 flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setCurrentStep(6)}
              className="px-6 py-2.5 rounded-xl bg-cyber-cyan text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center space-x-2 hover:bg-cyan-300 transition-all"
            >
              <span>Proceed to Official Submission</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: USER-CONTROLLED SUBMISSION */}
      {currentStep === 6 && (
        <div className="cyber-card rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white mb-1">Step 6 — User-Controlled Submission</h2>
            <p className="text-xs text-slate-400">
              Submit the draft directly to the platform&rsquo;s official portal. TruthLens never bypasses CAPTCHAs or claims automated submission.
            </p>
          </div>

          {/* Official Link Card */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-cyber-border space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">{selectedPlatform.name} Official Form</span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                VERIFIED URL
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Click the button below to launch the official reporting page in a secure new tab. Paste your generated notice into their &ldquo;Description of Violation&rdquo; or &ldquo;Additional Details&rdquo; field.
            </p>

            <button
              onClick={handleOpenPlatformUrl}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-glow-cyan"
            >
              <span>Open Official {selectedPlatform.name} Reporting Form</span>
              <ExternalLink className="w-4 h-4" />
            </button>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <span className="font-mono text-slate-300 font-semibold block">Platform Specific Tips:</span>
              {selectedPlatform.steps.map((st, i) => (
                <p key={i}>• {st}</p>
              ))}
            </div>
          </div>

          {/* Submission Confirmation Toggle */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <span className="text-xs font-mono uppercase text-slate-300 font-semibold block">
              Confirm Your Submission Status:
            </span>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="subStatus"
                  value="Submitted by user"
                  checked={currentCaseStatus === 'Submitted by user'}
                  onChange={() => setCurrentCaseStatus('Submitted by user')}
                  className="text-cyber-cyan"
                />
                <span className="text-xs text-slate-200">
                  I have submitted the report on {selectedPlatform.name} and received a confirmation page / email.
                </span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="subStatus"
                  value="Ready to submit"
                  checked={currentCaseStatus === 'Ready to submit'}
                  onChange={() => setCurrentCaseStatus('Ready to submit')}
                  className="text-cyber-cyan"
                />
                <span className="text-xs text-slate-200">
                  I have saved the draft and will submit it manually later.
                </span>
              </label>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                Optional: Platform Case / Confirmation Ticket ID
              </label>
              <input
                type="text"
                placeholder="e.g. IG-CASE-99214"
                value={submissionNotes}
                onChange={(e) => setSubmissionNotes(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white font-mono"
              />
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-cyber-border">
            <button
              onClick={() => setCurrentStep(5)}
              className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 font-semibold text-xs border border-slate-800 flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={handleSaveAndTrack}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shadow-glow-cyan"
            >
              <span>Save & Begin Progress Tracking</span>
              <Check className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 7: TRACK PROGRESS */}
      {currentStep === 7 && (
        <div className="cyber-card rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-cyber-border gap-2">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Step 7 — Incident Lifecycle Tracking</h2>
              <p className="text-xs text-slate-400">
                Track platform responses, log correspondence dates, and update resolution outcomes.
              </p>
            </div>
            <span className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
              ACTIVE CASE: {caseId}
            </span>
          </div>

          {/* Current Status Selector */}
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-2">
              Update Investigation Status:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { s: 'Ready to submit', label: 'Ready to submit', color: 'border-slate-700' },
                { s: 'Submitted by user', label: 'Submitted by user', color: 'border-blue-500/40 text-blue-300' },
                { s: 'Awaiting platform response', label: 'Awaiting platform response', color: 'border-amber-500/40 text-amber-300' },
                { s: 'Additional information requested', label: 'Additional info requested', color: 'border-purple-500/40 text-purple-300' },
                { s: 'Removed, as reported by user', label: 'Removed (User-Reported)', color: 'border-emerald-500/40 text-emerald-300' },
                { s: 'Rejected', label: 'Rejected by platform', color: 'border-rose-500/40 text-rose-300' },
                { s: 'Escalation needed', label: 'Escalation needed', color: 'border-red-600 text-red-400' }
              ].map((opt) => (
                <button
                  key={opt.s}
                  type="button"
                  onClick={() => handleUpdateStatus(opt.s as RemovalStatus)}
                  className={`p-3 rounded-xl text-left border text-xs font-mono transition-all ${
                    currentCaseStatus === opt.s
                      ? 'bg-cyber-panel border-cyber-cyan text-white shadow-glow-cyan/20 font-bold'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Next Steps & Escalation Guide */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-2">
            <span className="font-mono font-semibold text-white block">Recommended Follow-up Timeline:</span>
            <p className="text-slate-400 leading-relaxed">
              Allow 48 to 72 hours for standard platform moderation review. If no reply is received within 5 business days, re-submit via the escalation route ({selectedPlatform.escalation_route}).
            </p>
          </div>

          <div className="flex flex-wrap justify-between items-center pt-4 border-t border-cyber-border gap-3">
            <button
              onClick={() => router.push('/requests')}
              className="px-5 py-2.5 rounded-xl bg-cyber-panel hover:bg-slate-800 text-white font-semibold text-xs border border-cyber-border flex items-center space-x-2"
            >
              <span>View All Removal Requests</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => router.push('/dashboard')}
              className="px-6 py-2.5 rounded-xl bg-cyber-cyan text-slate-950 font-bold text-xs uppercase tracking-wider"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RemoveContentPage() {
  return (
    <React.Suspense fallback={<div className="max-w-5xl mx-auto p-12 text-center text-xs font-mono text-slate-400">Loading Takedown Orchestrator...</div>}>
      <RemoveContentInner />
    </React.Suspense>
  );
}
