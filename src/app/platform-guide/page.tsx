'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PLATFORMS_DATA } from '@/data/platforms';
import {
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Search,
  ArrowRight,
  Info,
  Calendar,
  AlertTriangle
} from 'lucide-react';

export default function PlatformGuidePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Social Media', 'Short Video', 'Video Platform', 'Discussion Community', 'Search Engine', 'Web Hosting & Domain'];

  const filtered = PLATFORMS_DATA.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-cyan-500/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono mb-2">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>VERIFIED PLATFORM DIRECTORY</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Verified Platform Reporting Guide
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Official, current takedown procedures, verified direct reporting forms, and escalation pathways across major online networks.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="p-4 rounded-2xl bg-cyber-panel border border-cyber-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search platform by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto text-xs font-mono">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === c
                  ? 'bg-cyber-panel text-cyber-cyan border border-cyber-cyan/40 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {c === 'all' ? 'All Platforms' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Platforms Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((platform) => (
          <div key={platform.id} className="cyber-card rounded-2xl p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white font-mono">{platform.name}</h3>
                  <span className="text-xs text-slate-400 font-mono">{platform.category}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded block">
                    {platform.verification_status}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Verified: {platform.last_verified_at}
                  </span>
                </div>
              </div>

              {/* Verified Links */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Primary Form:</span>
                  <a
                    href={platform.verified_reporting_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyber-cyan hover:underline flex items-center space-x-1"
                  >
                    <span>Launch Form</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                </div>
                {platform.impersonation_url && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Impersonation:</span>
                    <a
                      href={platform.impersonation_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyber-cyan hover:underline flex items-center space-x-1"
                    >
                      <span>Impersonation Portal</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                  </div>
                )}
                {platform.ncii_partner && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">NCII Partner:</span>
                    <span className="text-emerald-400">{platform.ncii_partner}</span>
                  </div>
                )}
              </div>

              {/* Step-by-Step Reporting Instructions */}
              <div>
                <span className="text-xs font-mono text-slate-300 font-semibold block mb-2">
                  Official In-App Reporting Flow:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {platform.steps.map((st, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-cyber-cyan font-bold font-mono">{i + 1}.</span>
                      <span className="leading-relaxed">{st}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Escalation Route */}
              <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/80 text-[11px] text-slate-400">
                <strong className="text-slate-300">Escalation Pathway: </strong>
                {platform.escalation_route}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-cyber-border flex items-center justify-between">
              <a
                href={platform.verified_reporting_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-400 hover:text-white flex items-center space-x-1"
              >
                <span>Visit Official Webform</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <Link
                href={`/remove-content?platform=${platform.id}`}
                className="px-3.5 py-1.5 rounded-lg bg-cyber-panel hover:bg-slate-800 border border-cyber-cyan/40 text-xs text-cyber-cyan font-bold flex items-center space-x-1.5"
              >
                <span>Draft Notice</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
