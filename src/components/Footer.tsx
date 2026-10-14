import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, EyeOff, AlertTriangle, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-cyber-border bg-[#03060f] text-slate-400 text-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-cyber-cyan" />
              <span className="font-bold text-white tracking-wider">TRUTHLENS AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your Digital Privacy Guardian. Advanced forensic media verification, privacy violation risk assessment, and guided content removal.
            </p>
            <div className="flex items-center space-x-2 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded w-fit">
              <Lock className="w-3 h-3" />
              <span>Zero-Knowledge Vault Mode</span>
            </div>
          </div>

          {/* Core Capabilities */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3 font-mono">Capabilities</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/analyze" className="hover:text-cyber-cyan transition-colors">
                  Media Authenticity Lab
                </Link>
              </li>
              <li>
                <Link href="/privacy-check" className="hover:text-cyber-cyan transition-colors">
                  Privacy Risk Assessment
                </Link>
              </li>
              <li>
                <Link href="/remove-content" className="hover:text-cyber-cyan transition-colors">
                  Guided Content Removal
                </Link>
              </li>
              <li>
                <Link href="/guardian" className="hover:text-cyber-cyan transition-colors">
                  Guardian AI Chatbot
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Guides */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3 font-mono">Documentation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/platform-guide" className="hover:text-cyber-cyan transition-colors">
                  Verified Platform Directory
                </Link>
              </li>
              <li>
                <Link href="/settings/privacy" className="hover:text-cyber-cyan transition-colors">
                  Data Retention & Deletion
                </Link>
              </li>
              <li>
                <a href="https://stopncii.org" target="_blank" rel="noopener noreferrer" className="hover:text-cyber-cyan flex items-center space-x-1">
                  <span>StopNCII.org (Hash Registry)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://takeitdown.ncmec.org" target="_blank" rel="noopener noreferrer" className="hover:text-cyber-cyan flex items-center space-x-1">
                  <span>Take It Down (NCMEC)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Privacy Principle */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2 font-mono">Product Principle</h4>
            <div className="p-3 rounded-lg bg-cyber-panel border border-cyber-border text-xs leading-relaxed text-slate-300">
              <p className="font-semibold text-cyber-cyan mb-1">
                &ldquo;Detect the risk. Understand your rights. Take action. Protect your digital identity.&rdquo;
              </p>
              <p className="text-[11px] text-slate-400">
                User uploads are processed securely, never sold, and never utilized for machine learning training datasets without explicit consent.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer Banner */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center space-x-2 text-[11px]">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <p>
              <strong>Notice:</strong> Detection results are probabilistic indicators and do not constitute formal legal adjudication. Content removal outcomes depend solely upon platform compliance and applicable legal authorities.
            </p>
          </div>
          <div className="font-mono text-[11px] text-slate-500">
            TruthLens AI &copy; 2026. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
