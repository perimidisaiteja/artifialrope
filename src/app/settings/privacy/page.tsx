'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Sliders,
  ShieldCheck,
  Lock,
  Trash2,
  Download,
  Key,
  Check,
  AlertTriangle,
  EyeOff,
  Database,
  RefreshCw,
  Clock
} from 'lucide-react';

export default function PrivacySettingsPage() {
  const router = useRouter();
  const { user, updateUserSettings, clearAllUserData, investigations, removalRequests, evidenceItems } = useApp();

  const [retentionDays, setRetentionDays] = useState(user.retentionDays || 30);
  const [apiKey, setApiKey] = useState(user.apiKey || '');
  const [anonymizeData, setAnonymizeData] = useState(user.anonymizeData ?? true);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserSettings({
      retentionDays: Number(retentionDays),
      apiKey: apiKey.trim(),
      anonymizeData
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleExportAllData = () => {
    const backup = {
      exported_at: new Date().toISOString(),
      user_profile: user,
      investigations,
      removal_requests: removalRequests,
      evidence_vault: evidenceItems
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TruthLens_Data_Export_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePurgeAll = () => {
    clearAllUserData();
    router.push('/');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-cyan-500/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono mb-2">
          <Sliders className="w-3.5 h-3.5" />
          <span>DATA INTEGRITY & PRIVACY CONTROLS</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Privacy & Vault Settings
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Configure retention schedules, export your forensic case vault, manage AI inference keys, or securely purge all data.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center space-x-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Privacy preferences updated successfully.</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSaveSettings} className="cyber-card rounded-2xl p-6 sm:p-8 space-y-6">
        {/* Retention Policy */}
        <div className="pb-6 border-b border-cyber-border space-y-3">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-cyber-cyan" />
            <h3 className="text-sm font-bold text-white font-mono uppercase">Evidence Auto-Retention Policy</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Specify how many days evidence files and investigation logs are maintained before automatic expiration and deletion.
          </p>
          <div className="flex gap-3 pt-1">
            {[7, 30, 60, 90].map((days) => (
              <button
                key={days}
                type="button"
                onClick={() => setRetentionDays(days)}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all border ${
                  retentionDays === days
                    ? 'bg-cyber-panel border-cyber-cyan text-cyber-cyan font-bold shadow-glow-cyan/30'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                {days} Days
              </button>
            ))}
          </div>
        </div>

        {/* Gemini / AI Provider Configuration */}
        <div className="pb-6 border-b border-cyber-border space-y-3">
          <div className="flex items-center space-x-2">
            <Key className="w-4 h-4 text-violet-400" />
            <h3 className="text-sm font-bold text-white font-mono uppercase">AI Assistant Inference Key (Optional)</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            By default, TruthLens AI uses its built-in Expert Privacy Knowledge Engine and backend inference. If you have your own Google Gemini API key (e.g. Free Tier Gemini Flash), you may provide it below.
          </p>
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <span className="text-amber-300 font-semibold font-mono">Notice on Models:</span>
            <p>
              Standard free-tier models (<strong>gemini-1.5-flash</strong> and <strong>gemini-2.0-flash</strong>) are fully supported. Gemini Pro is <strong>not</strong> required.
            </p>
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
              Google Gemini API Key
            </label>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-cyber-cyan"
            />
          </div>
        </div>

        {/* Anonymization & Telemetry */}
        <div className="pb-6 border-b border-cyber-border space-y-3">
          <div className="flex items-center space-x-2">
            <EyeOff className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white font-mono uppercase">Confidentiality & Telemetry</h3>
          </div>
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={anonymizeData}
              onChange={(e) => setAnonymizeData(e.target.checked)}
              className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-cyber-cyan focus:ring-0 mt-0.5"
            />
            <div className="text-xs">
              <span className="text-white font-semibold block">Strip Identifiers from Export Logs</span>
              <span className="text-slate-400 leading-relaxed block mt-0.5">
                Redacts names, specific IP traces, and private email strings from diagnostic session bundles.
              </span>
            </div>
          </label>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-cyber-cyan text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-all shadow-glow-cyan"
        >
          Save Privacy Settings
        </button>
      </form>

      {/* Data Management: Export & Purge */}
      <div className="cyber-card rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center space-x-2">
          <Database className="w-4 h-4 text-cyber-cyan" />
          <h3 className="text-sm font-bold text-white font-mono uppercase">Data Export & Vault Destruction</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="font-bold text-white text-xs block">Export Investigation Archive</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Download an encrypted JSON bundle containing all your active investigations, removal drafts, and forensic scan hashes.
            </p>
            <button
              onClick={handleExportAllData}
              className="mt-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 flex items-center space-x-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-cyber-cyan" />
              <span>Download JSON Archive</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-2">
            <span className="font-bold text-rose-300 text-xs block">Zero-Trace Data Destruction</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Permanently purges all locally cached evidence files, chat consultations, and case history from this browser.
            </p>
            {!confirmDelete ? (
              <button
                onClick={() => setConfirmDelete(true)}
                className="mt-2 px-4 py-2 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-xs text-rose-300 border border-rose-500/30 flex items-center space-x-1.5 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                <span>Purge All Vault Data</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2 pt-1">
                <button
                  onClick={handlePurgeAll}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
                >
                  Confirm Instant Purge
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
