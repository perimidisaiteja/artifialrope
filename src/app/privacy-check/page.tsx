'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { submitPrivacyAssessment } from '@/lib/api';
import { IncidentType, PrivacyAssessment } from '@/types';
import {
  FileSearch,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Lock,
  EyeOff,
  PhoneCall,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  FileText,
  LifeBuoy
} from 'lucide-react';

export default function PrivacyCheckPage() {
  const router = useRouter();
  const { addInvestigation } = useApp();

  const [incidentType, setIncidentType] = useState<IncidentType>('unauthorized_photo');
  const [platform, setPlatform] = useState('Instagram');
  const [contentUrl, setContentUrl] = useState('');
  const [description, setDescription] = useState('');
  const [hasThreats, setHasThreats] = useState(false);
  const [isDepicted, setIsDepicted] = useState(true);
  const [loading, setLoading] = useState(false);
  const [assessment, setAssessment] = useState<PrivacyAssessment | null>(null);

  const incidentOptions: Array<{ type: IncidentType; label: string; desc: string }> = [
    {
      type: 'unauthorized_photo',
      label: 'Unauthorized Personal Photo',
      desc: 'A photo of you published without your permission or consent.'
    },
    {
      type: 'deepfake_misuse',
      label: 'AI Deepfake / Face-Swap',
      desc: 'Synthetic media using your facial likeness in an altered or fabricated scenario.'
    },
    {
      type: 'impersonation',
      label: 'Impersonation / Fake Profile',
      desc: 'An account copying your name, photos, or bio to mislead people.'
    },
    {
      type: 'doxxing',
      label: 'Doxxing / Exposed Personal Info',
      desc: 'Your home address, phone number, private email, or employer posted publicly.'
    },
    {
      type: 'ncii',
      label: 'Non-Consensual Intimate Imagery',
      desc: 'Intimate or explicit photos/videos shared without authorization or threatened for extortion.'
    },
    {
      type: 'harassment',
      label: 'Targeted Harassment with Private Data',
      desc: 'Organized online harassment or cyberbullying utilizing your private details.'
    },
    {
      type: 'sensitive_documents',
      label: 'Sensitive Personal Documents',
      desc: 'Government IDs, financial statements, or medical records exposed without consent.'
    },
    {
      type: 'search_exposure',
      label: 'Harmful Search Engine Exposure',
      desc: 'Damaging private links appearing prominently in Google or Bing name search results.'
    }
  ];

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setLoading(true);
    try {
      const res = await submitPrivacyAssessment({
        description,
        incident_type: incidentType,
        platform,
        has_threats: hasThreats,
        is_depicted: isDepicted
      });
      setAssessment(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleProceedToTakedown = () => {
    if (!assessment) return;
    const inv = addInvestigation({
      title: `${assessment.category_title} on ${platform}`,
      incidentType,
      platform,
      contentUrl,
      description,
      severity: assessment.severity_level
    });
    router.push(`/remove-content?investigationId=${inv.id}&platform=${encodeURIComponent(platform)}&type=${incidentType}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      {/* Page Header */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-mono mb-2">
          <FileSearch className="w-3.5 h-3.5" />
          <span>INCIDENT TRIAGE & SEVERITY ASSESSMENT</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Digital Privacy Risk Assessment
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Document potential misuse of your likeness, photos, or personal data. Receive immediate severity analysis, emergency safety instructions, and safe evidence preservation steps.
        </p>
      </div>

      {/* Sensitive Material Notice */}
      <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyber-cyan/30 text-xs mb-8 flex items-start space-x-3 text-slate-300">
        <Lock className="w-5 h-5 text-cyber-cyan shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-white font-mono block mb-1">
            PRIVACY SAFEGUARD: MINIMAL DATA PROCESSING
          </span>
          <p className="text-slate-400 leading-relaxed">
            Please do not upload intimate or explicit images of yourself or others. A written description, public URL, or redacted screenshot is fully sufficient to evaluate your situation and prepare removal notices.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleEvaluate} className="cyber-card rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-2">
                1. Select the Incident Category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {incidentOptions.map((opt) => (
                  <button
                    key={opt.type}
                    type="button"
                    onClick={() => setIncidentType(opt.type)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      incidentType === opt.type
                        ? 'bg-cyber-panel border-cyber-cyan text-white shadow-glow-cyan/20'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-xs font-bold block mb-1 text-white">{opt.label}</span>
                    <span className="text-[11px] text-slate-400 leading-tight block">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Platform & URL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-2">
                  2. Hosting Platform / Service
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyber-cyan font-mono"
                >
                  <option value="Instagram">Instagram</option>
                  <option value="Facebook">Facebook</option>
                  <option value="TikTok">TikTok</option>
                  <option value="YouTube">YouTube</option>
                  <option value="X">X (Twitter)</option>
                  <option value="Reddit">Reddit</option>
                  <option value="Google Search">Google Search Result</option>
                  <option value="Independent Website">Independent Website / Host</option>
                  <option value="Other">Other / Unknown</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-2">
                  Content URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://platform.com/post/..."
                  value={contentUrl}
                  onChange={(e) => setContentUrl(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan font-mono"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-2">
                3. Describe the Privacy Concern
              </label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain what was posted, how your likeness or information is used, and if threats or extortion were made..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan leading-relaxed"
              />
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 pt-2">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isDepicted}
                  onChange={(e) => setIsDepicted(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-cyber-cyan focus:ring-0"
                />
                <span className="text-xs text-slate-300">
                  I am the person depicted or directly targeted in this content.
                </span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasThreats}
                  onChange={(e) => setHasThreats(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-rose-500 focus:ring-0"
                />
                <span className="text-xs text-rose-300 font-medium">
                  This incident involves active blackmail, extortion demands, or physical threats.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !description.trim()}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider shadow-glow-cyan transition-all disabled:opacity-50"
            >
              {loading ? 'Evaluating Incident Risk...' : 'Analyze Privacy Violation & Generate Guidance'}
            </button>
          </form>
        </div>

        {/* Right Output: Assessment Report */}
        <div className="lg:col-span-5">
          {assessment ? (
            <div className="cyber-card rounded-2xl p-6 sm:p-7 space-y-6">
              {/* Severity Banner */}
              <div
                className={`p-4 rounded-xl border flex items-center justify-between ${
                  assessment.severity_level === 'Critical'
                    ? 'bg-rose-500/10 border-rose-500/40 text-rose-300'
                    : assessment.severity_level === 'High'
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                    : 'bg-blue-500/10 border-blue-500/40 text-blue-300'
                }`}
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider block">Assessed Severity</span>
                  <span className="text-lg font-bold font-mono">{assessment.severity_level} Risk Level</span>
                </div>
                <div className="text-2xl font-extrabold font-mono">
                  {assessment.severity_score}/100
                </div>
              </div>

              {/* Emergency Alert (if applicable) */}
              {assessment.is_emergency_concern && (
                <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/40 text-xs space-y-2 text-rose-200">
                  <div className="flex items-center space-x-2 text-rose-300 font-bold font-mono">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span>EMERGENCY SAFETY ADVISORY</span>
                  </div>
                  <ul className="space-y-1 text-[11px] list-disc list-inside">
                    <li>Never pay money or send cryptocurrency to extortionists; demands will escalate.</li>
                    <li>If you are in immediate physical danger, contact local emergency dispatch (911 / 112).</li>
                    <li>Preemptively protect images via StopNCII.org or TakeItDown.ncmec.org.</li>
                  </ul>
                </div>
              )}

              {/* Immediate Safety Steps */}
              <div>
                <h3 className="text-xs font-mono uppercase text-slate-300 font-semibold mb-2.5 flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-cyber-cyan" />
                  <span>Immediate Action Steps</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  {assessment.immediate_safety_steps.map((step, i) => (
                    <li key={i} className="flex items-start space-x-2 p-2.5 rounded-lg bg-slate-900/50 border border-slate-800">
                      <span className="text-cyber-cyan font-bold font-mono">{i + 1}.</span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Evidence Preservation Guidelines */}
              <div>
                <h3 className="text-xs font-mono uppercase text-slate-300 font-semibold mb-2.5 flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-violet-400" />
                  <span>Safe Evidence Preservation</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  {assessment.evidence_preservation_guidelines.map((guide, i) => (
                    <li key={i} className="flex items-start space-x-2 p-2 rounded-lg bg-slate-900/40 border border-slate-800 text-[11px]">
                      <span className="text-violet-400 font-bold font-mono">•</span>
                      <span>{guide}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disclaimer */}
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                {assessment.transparent_limitations}
              </div>

              {/* Action Button */}
              <button
                onClick={handleProceedToTakedown}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-glow-cyan flex items-center justify-center space-x-2 transition-all"
              >
                <span>Proceed to Guided Content Removal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="cyber-card rounded-2xl p-10 text-center flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-14 h-14 rounded-2xl bg-violet-500/10 text-violet-400 border border-violet-500/30 flex items-center justify-center mb-4">
                <FileSearch className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Awaiting Incident Input</h3>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Fill in the details on the left to receive customized safety steps, severity analysis, and evidence preservation guidelines.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
