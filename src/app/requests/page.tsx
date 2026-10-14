'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { RemovalStatus, RemovalRequest } from '@/types';
import {
  FileText,
  ExternalLink,
  Copy,
  Check,
  Clock,
  AlertTriangle,
  ArrowRight,
  Filter,
  Sliders,
  CheckCircle2
} from 'lucide-react';

export default function RequestsPage() {
  const { removalRequests, updateRemovalRequestStatus } = useApp();
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const statuses: RemovalStatus[] = [
    'Draft',
    'Ready to submit',
    'Submitted by user',
    'Submission confirmed through authorized integration',
    'Awaiting platform response',
    'Additional information requested',
    'Removed, as reported by user',
    'Removal independently verified',
    'Rejected',
    'Escalation needed',
    'Closed'
  ];

  const filteredRequests = removalRequests.filter((req) => {
    if (filterPlatform !== 'all' && req.platform !== filterPlatform) return false;
    if (filterStatus !== 'all' && req.status !== filterStatus) return false;
    return true;
  });

  const handleCopyNotice = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-cyber-border gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>CASE LIFECYCLE MANAGEMENT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Removal-Request Tracking
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track status updates, external ticket reference IDs, and platform responses for every takedown filing.
          </p>
        </div>

        <Link
          href="/remove-content"
          className="px-4 py-2.5 rounded-xl bg-cyber-cyan text-slate-950 font-bold text-xs uppercase tracking-wider self-start sm:self-auto"
        >
          + New Removal Notice
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-cyber-panel border border-cyber-border flex flex-wrap items-center gap-4 text-xs font-mono">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-slate-300 font-semibold">Filters:</span>
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none"
        >
          <option value="all">All Statuses</option>
          {statuses.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>

        <select
          value={filterPlatform}
          onChange={(e) => setFilterPlatform(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none"
        >
          <option value="all">All Platforms</option>
          <option value="instagram">Instagram</option>
          <option value="facebook">Facebook</option>
          <option value="tiktok">TikTok</option>
          <option value="youtube">YouTube</option>
          <option value="x">X (Twitter)</option>
          <option value="reddit">Reddit</option>
          <option value="google_search">Google Search</option>
          <option value="independent_website">Independent Website</option>
        </select>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((req) => (
            <div key={req.id} className="cyber-card rounded-2xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-cyber-border gap-2">
                <div className="flex items-center space-x-3">
                  <span className="text-base font-bold text-white font-mono">{req.platformName}</span>
                  <span className="text-xs font-mono text-cyber-cyan bg-cyan-500/10 px-2 py-0.5 rounded border border-cyber-cyan/30">
                    {req.id}
                  </span>
                  {req.externalReference && (
                    <span className="text-[11px] font-mono text-slate-400">
                      Ticket: {req.externalReference}
                    </span>
                  )}
                </div>

                {/* Status Dropdown */}
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-400 font-mono">Status:</span>
                  <select
                    value={req.status}
                    onChange={(e) => updateRemovalRequestStatus(req.id, e.target.value as RemovalStatus)}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-mono text-white focus:outline-none focus:border-cyber-cyan"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* URL and Target Details */}
              <div className="text-xs space-y-1 font-mono">
                <div className="text-slate-400 truncate">
                  <span className="text-slate-500">Target Content: </span>
                  <a
                    href={req.contentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyber-cyan hover:underline"
                  >
                    {req.contentUrl}
                  </a>
                </div>
                {req.reportingUrl && (
                  <div className="text-slate-400 truncate">
                    <span className="text-slate-500">Official Portal: </span>
                    <a
                      href={req.reportingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-300 hover:text-white inline-flex items-center space-x-1"
                    >
                      <span>{req.reportingUrl}</span>
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                )}
              </div>

              {/* Note / Follow-up */}
              {req.notes && (
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
                  <span className="font-mono text-slate-500 block mb-0.5">Investigator Notes:</span>
                  {req.notes}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 text-xs">
                <span className="text-[11px] text-slate-500 font-mono">
                  Last updated {new Date(req.lastUpdatedAt).toLocaleDateString()}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleCopyNotice(req.id, req.editableDraft)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 flex items-center space-x-1"
                  >
                    {copiedId === req.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                    )}
                    <span>{copiedId === req.id ? 'Copied' : 'Copy Notice'}</span>
                  </button>
                  <a
                    href={req.reportingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-cyber-panel hover:bg-slate-800 text-xs text-cyber-cyan border border-cyber-cyan/40 flex items-center space-x-1"
                  >
                    <span>Open Official Form</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="cyber-card rounded-2xl p-12 text-center text-xs text-slate-500">
            No removal requests match the selected filters.
          </div>
        )}
      </div>
    </div>
  );
}
