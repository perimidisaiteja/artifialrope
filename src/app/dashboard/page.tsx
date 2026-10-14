'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  LayoutDashboard,
  ShieldCheck,
  Cpu,
  FileText,
  FileSearch,
  MessageSquare,
  Lock,
  Trash2,
  ExternalLink,
  Plus,
  ArrowRight,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Layers,
  Archive,
  Sliders,
  Calendar,
  Eye,
  Key
} from 'lucide-react';

export default function DashboardPage() {
  const {
    user,
    investigations,
    mediaAnalyses,
    removalRequests,
    evidenceItems,
    chatMessages,
    deleteEvidenceItem,
    clearAllUserData
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'investigations' | 'analyses' | 'requests' | 'evidence'>('overview');

  const pendingReminders = removalRequests.filter(
    (r) => r.status === 'Ready to submit' || r.status === 'Awaiting platform response'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Top Banner & User Profile Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-cyber-border gap-4 mb-8">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AUTHENTICATED PRIVACY CONSOLE</span>
            {user.isGuest && (
              <span className="bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.2 rounded text-[10px]">
                GUEST DEMO SESSION
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Security & Case Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Logged in as <strong className="text-white">{user.displayName}</strong> ({user.email}) • Retention deadline set to {user.retentionDays} days
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/analyze"
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow-glow-cyan"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Media Scan</span>
          </Link>
          <Link
            href="/remove-content"
            className="px-3.5 py-2 rounded-xl bg-cyber-panel hover:bg-slate-800 border border-cyber-border text-white text-xs font-semibold flex items-center space-x-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-cyber-cyan" />
            <span>New Takedown Notice</span>
          </Link>
        </div>
      </div>

      {/* Demo State Notice */}
      {user.isGuest && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs mb-8 flex items-center justify-between text-amber-200">
          <div className="flex items-center space-x-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Demo Mode Notice:</strong> You are browsing in guest mode with sample data. To synchronize investigations across devices,{' '}
              <Link href="/auth" className="underline font-bold text-white">
                create a private account
              </Link>.
            </span>
          </div>
          <Link href="/auth" className="text-xs font-mono font-bold text-amber-300 hover:underline shrink-0 ml-4">
            Sign In &rarr;
          </Link>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex space-x-2 border-b border-cyber-border pb-3 mb-8 overflow-x-auto text-xs font-mono">
        {[
          { id: 'overview', label: `Overview`, count: null },
          { id: 'investigations', label: 'Investigations', count: investigations.length },
          { id: 'analyses', label: 'Media Forensics', count: mediaAnalyses.length },
          { id: 'requests', label: 'Removal Requests', count: removalRequests.length },
          { id: 'evidence', label: 'Evidence Vault', count: evidenceItems.length }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl font-medium flex items-center space-x-2 transition-all ${
              activeTab === tab.id
                ? 'bg-cyber-panel text-cyber-cyan border border-cyber-cyan/40 shadow-glow-cyan/20 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== null && (
              <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px] text-slate-300">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-cyber-panel border border-cyber-border">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">ACTIVE INVESTIGATIONS</span>
              <span className="text-3xl font-extrabold font-mono text-white">{investigations.length}</span>
              <span className="text-[10px] text-cyber-cyan block mt-1">Cases in vault</span>
            </div>

            <div className="p-4 rounded-2xl bg-cyber-panel border border-cyber-border">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">REMOVAL NOTICES</span>
              <span className="text-3xl font-extrabold font-mono text-white">{removalRequests.length}</span>
              <span className="text-[10px] text-emerald-400 block mt-1">Platform filings</span>
            </div>

            <div className="p-4 rounded-2xl bg-cyber-panel border border-cyber-border">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">PENDING ACTIONS</span>
              <span className="text-3xl font-extrabold font-mono text-amber-400">{pendingReminders.length}</span>
              <span className="text-[10px] text-amber-300 block mt-1">Follow-ups due</span>
            </div>

            <div className="p-4 rounded-2xl bg-cyber-panel border border-cyber-border">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">SECURE EVIDENCE</span>
              <span className="text-3xl font-extrabold font-mono text-violet-400">{evidenceItems.length}</span>
              <span className="text-[10px] text-violet-300 block mt-1">Encrypted artifacts</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Active Investigations Feed */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-mono uppercase text-slate-300 font-bold flex items-center space-x-2">
                  <FileSearch className="w-4 h-4 text-cyber-cyan" />
                  <span>Active Investigations</span>
                </h3>
                <Link href="/privacy-check" className="text-xs text-cyber-cyan hover:underline">
                  + Create Case
                </Link>
              </div>

              {investigations.length > 0 ? (
                <div className="space-y-3">
                  {investigations.map((inv) => (
                    <div
                      key={inv.id}
                      className="p-4 rounded-2xl bg-cyber-panel border border-cyber-border hover:border-cyber-cyan/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-mono font-bold text-cyber-cyan">{inv.id}</span>
                          <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-slate-800 text-slate-300">
                            {inv.platform}
                          </span>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.2 rounded ${
                              inv.severity === 'Critical'
                                ? 'bg-rose-500/10 text-rose-300'
                                : inv.severity === 'High'
                                ? 'bg-amber-500/10 text-amber-300'
                                : 'bg-blue-500/10 text-blue-300'
                            }`}
                          >
                            {inv.severity}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white">{inv.title}</h4>
                        <p className="text-xs text-slate-400 line-clamp-1">{inv.description}</p>
                      </div>

                      <div className="flex items-center space-x-2 self-start sm:self-auto shrink-0">
                        <Link
                          href={`/investigations/${inv.id}`}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 flex items-center space-x-1"
                        >
                          <span>Manage</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center text-xs text-slate-500">
                  No active investigations found.
                </div>
              )}
            </div>

            {/* Pending Reminders & Actions */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-sm font-mono uppercase text-slate-300 font-bold flex items-center space-x-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Pending Removals & Follow-ups</span>
              </h3>

              {pendingReminders.length > 0 ? (
                <div className="space-y-3">
                  {pendingReminders.map((req) => (
                    <div
                      key={req.id}
                      className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/20 text-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white font-mono">{req.platformName} Notice</span>
                        <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                          {req.status}
                        </span>
                      </div>
                      <p className="text-slate-400 text-[11px] truncate">{req.contentUrl}</p>
                      <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                        <span className="text-[10px] text-slate-500 font-mono">
                          Updated {new Date(req.lastUpdatedAt).toLocaleDateString()}
                        </span>
                        <Link
                          href="/requests"
                          className="text-[11px] font-semibold text-cyber-cyan hover:underline"
                        >
                          Update Status &rarr;
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-center text-xs text-slate-500">
                  No pending action items or reminders.
                </div>
              )}

              {/* AI Guardian Consultation Summary */}
              <div className="p-5 rounded-2xl bg-cyber-panel border border-cyber-border space-y-3">
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-300 font-semibold">
                  <MessageSquare className="w-4 h-4 text-violet-400" />
                  <span>AI Guardian Session History</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {chatMessages.length} total messages recorded in local consultation session.
                </p>
                <Link
                  href="/guardian"
                  className="inline-flex items-center space-x-1.5 text-xs text-cyber-cyan font-bold hover:underline"
                >
                  <span>Resume Guardian Conversation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INVESTIGATIONS LIST */}
      {activeTab === 'investigations' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-mono text-slate-300 uppercase font-bold">All Documented Investigations</h3>
            <Link
              href="/privacy-check"
              className="px-3 py-1.5 rounded-lg bg-cyber-cyan text-slate-950 font-bold text-xs"
            >
              + New Case
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {investigations.map((inv) => (
              <div key={inv.id} className="cyber-card rounded-2xl p-5 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-cyber-cyan font-bold">{inv.id}</span>
                    <h4 className="text-base font-bold text-white">{inv.title}</h4>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      inv.status === 'Resolved'
                        ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {inv.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2">{inv.description}</p>
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Evidence: {inv.evidenceCount} items</span>
                  <Link
                    href={`/investigations/${inv.id}`}
                    className="text-cyber-cyan hover:underline flex items-center space-x-1"
                  >
                    <span>Timeline & Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MEDIA FORENSICS */}
      {activeTab === 'analyses' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-mono text-slate-300 uppercase font-bold">Recent Media Authenticity Analyses</h3>
            <Link
              href="/analyze"
              className="px-3 py-1.5 rounded-lg bg-cyber-cyan text-slate-950 font-bold text-xs"
            >
              Scan New File
            </Link>
          </div>
          {mediaAnalyses.length > 0 ? (
            <div className="space-y-3">
              {mediaAnalyses.map((rep, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-cyber-panel border border-cyber-border flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono text-cyber-cyan font-bold">{rep.media_identifier}</span>
                    <h4 className="font-bold text-white">{rep.filename}</h4>
                    <span className="text-slate-400 font-mono text-[11px]">
                      Score: {rep.calibrated_score}% ({rep.overall_classification})
                    </span>
                  </div>
                  <Link
                    href="/analyze"
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700"
                  >
                    View Report
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-slate-500 cyber-card rounded-2xl">
              No recent media analysis runs recorded. Visit the Authenticity Lab to analyze an image or video.
            </div>
          )}
        </div>
      )}

      {/* TAB 4: REMOVAL REQUESTS */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-mono text-slate-300 uppercase font-bold">All Takedown Notices & Requests</h3>
            <Link
              href="/remove-content"
              className="px-3 py-1.5 rounded-lg bg-cyber-cyan text-slate-950 font-bold text-xs"
            >
              + Create Request
            </Link>
          </div>
          <div className="space-y-3">
            {removalRequests.map((req) => (
              <div key={req.id} className="p-4 rounded-2xl bg-cyber-panel border border-cyber-border space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white text-sm font-mono">{req.platformName}</span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                      {req.id}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-cyber-cyan">{req.status}</span>
                </div>
                <p className="text-slate-400 font-mono text-[11px] truncate">{req.contentUrl}</p>
                <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-[11px]">
                  <span className="text-slate-500 font-mono">Created {new Date(req.createdAt).toLocaleDateString()}</span>
                  <Link href="/requests" className="text-cyber-cyan hover:underline">
                    Manage Case Status &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: EVIDENCE VAULT */}
      {activeTab === 'evidence' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-sm font-mono text-slate-300 uppercase font-bold">Encrypted Evidence Vault</h3>
              <p className="text-xs text-slate-400">
                Local cryptographic evidence repository with automated retention deadlines and individual purge controls.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {evidenceItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-900/80 border border-cyber-border flex items-center justify-between text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white font-mono">{item.filename}</span>
                    {item.redacted && (
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                        REDACTED
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 text-[11px] font-mono">
                    SHA-256: {item.sha256Hash} • {(item.fileSizeBytes / 1024).toFixed(0)} KB
                  </p>
                  <p className="text-[10px] text-amber-400/90 font-mono">
                    Retention Expiry: {new Date(item.retentionDeadline).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => deleteEvidenceItem(item.id)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700 transition-all"
                    title="Permanently Delete Evidence"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
