'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  ShieldAlert,
  ShieldCheck,
  FileText,
  Clock,
  Trash2,
  Plus,
  ArrowLeft,
  ExternalLink,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Layers,
  FileSearch
} from 'lucide-react';

export default function InvestigationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { investigations, updateInvestigationStatus, evidenceItems, addEvidenceItem, deleteEvidenceItem } = useApp();

  const investigation = investigations.find((inv) => inv.id === id);

  const [newNote, setNewNote] = useState('');
  const [evidenceName, setEvidenceName] = useState('');
  const [showAddEvidence, setShowAddEvidence] = useState(false);

  if (!investigation) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-white mb-2">Investigation Not Found</h2>
        <p className="text-xs text-slate-400 mb-6">The requested case record does not exist or was deleted.</p>
        <Link href="/dashboard" className="px-4 py-2 rounded-xl bg-cyber-cyan text-slate-950 font-bold text-xs">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const caseEvidence = evidenceItems.filter((e) => e.investigationId === investigation.id);

  const handleStatusChange = (newStatus: any) => {
    updateInvestigationStatus(investigation.id, newStatus);
  };

  const handleAddEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evidenceName.trim()) return;

    addEvidenceItem({
      investigationId: investigation.id,
      filename: evidenceName,
      contentType: 'image/png',
      fileSizeBytes: 245000,
      sha256Hash: `hash-${Math.random().toString(16).substring(2, 12)}`,
      redacted: true
    });
    setEvidenceName('');
    setShowAddEvidence(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-cyber-border gap-4">
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center space-x-1.5 text-xs font-mono text-slate-400 hover:text-cyber-cyan mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-white tracking-tight">{investigation.title}</h1>
            <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-slate-800 text-cyber-cyan border border-cyber-border">
              {investigation.id}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Platform: <strong className="text-white">{investigation.platform}</strong> • Created on{' '}
            {new Date(investigation.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono text-slate-400">Status:</span>
          <select
            value={investigation.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="bg-slate-900 border border-cyber-border rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cyber-cyan"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Escalated">Escalated</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Timeline & Notes */}
        <div className="lg:col-span-7 space-y-6">
          {/* Summary Box */}
          <div className="cyber-card rounded-2xl p-6 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400 uppercase font-semibold">Incident Overview</span>
              <span
                className={`font-mono px-2 py-0.5 rounded text-[10px] ${
                  investigation.severity === 'Critical'
                    ? 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
                    : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                }`}
              >
                {investigation.severity} Severity
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{investigation.description}</p>
            {investigation.contentUrl && (
              <div className="pt-2 text-xs font-mono">
                <span className="text-slate-400">Target URL: </span>
                <a
                  href={investigation.contentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyber-cyan hover:underline break-all inline-flex items-center space-x-1"
                >
                  <span>{investigation.contentUrl}</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            )}
          </div>

          {/* Timeline */}
          <div className="cyber-card rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-mono uppercase text-slate-300 font-bold flex items-center space-x-2">
              <Clock className="w-4 h-4 text-cyber-cyan" />
              <span>Investigation Chronology & Events</span>
            </h3>

            <div className="space-y-4 pl-2 border-l-2 border-slate-800 ml-2">
              {investigation.timeline?.map((event) => (
                <div key={event.id} className="relative pl-6 space-y-1">
                  <div className="absolute -left-[13px] top-1 w-3 h-3 rounded-full bg-cyber-cyan border-2 border-slate-950" />
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-white">{event.title}</span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {new Date(event.timestamp).toLocaleDateString()} {new Date(event.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Evidence Vault for this case */}
        <div className="lg:col-span-5 space-y-6">
          <div className="cyber-card rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-cyber-border">
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-mono uppercase text-white font-bold">Associated Evidence</h3>
              </div>
              <button
                onClick={() => setShowAddEvidence(!showAddEvidence)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-cyber-cyan font-mono border border-slate-700"
              >
                + Add Evidence
              </button>
            </div>

            {showAddEvidence && (
              <form onSubmit={handleAddEvidence} className="p-3 bg-slate-900 rounded-xl space-y-2 border border-slate-800">
                <input
                  type="text"
                  required
                  placeholder="Evidence name (e.g., Redacted_Post_Screenshot.png)"
                  value={evidenceName}
                  onChange={(e) => setEvidenceName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                />
                <button
                  type="submit"
                  className="w-full py-1.5 rounded-lg bg-cyber-cyan text-slate-950 text-xs font-bold font-mono"
                >
                  Record into Vault
                </button>
              </form>
            )}

            {caseEvidence.length > 0 ? (
              <div className="space-y-2.5">
                {caseEvidence.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-mono text-white font-semibold block">{item.filename}</span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {(item.fileSizeBytes / 1024).toFixed(0)} KB • Redacted
                      </span>
                    </div>
                    <button
                      onClick={() => deleteEvidenceItem(item.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400"
                      title="Delete Evidence"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-slate-900/30 text-center text-xs text-slate-500 border border-slate-800">
                No evidence items attached yet.
              </div>
            )}

            <div className="pt-4 border-t border-cyber-border flex flex-col space-y-2">
              <Link
                href={`/remove-content?investigationId=${investigation.id}&platform=${investigation.platform}&type=${investigation.incidentType}`}
                className="w-full py-2.5 rounded-xl bg-cyber-panel hover:bg-slate-800 border border-cyber-cyan/40 text-center text-xs font-semibold text-cyber-cyan transition-all"
              >
                Draft Formal Removal Request
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
