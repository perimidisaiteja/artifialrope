'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  ShieldAlert,
  ShieldCheck,
  Cpu,
  FileSearch,
  MessageSquare,
  FileText,
  Sliders,
  Menu,
  X,
  ExternalLink,
  User,
  LayoutDashboard,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Analyze Media', href: '/analyze', icon: Cpu },
    { name: 'Privacy Check', href: '/privacy-check', icon: FileSearch },
    { name: 'Remove Content', href: '/remove-content', icon: FileText },
    { name: 'Guardian AI', href: '/guardian', icon: MessageSquare },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Platform Guide', href: '/platform-guide', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#040711]/85 border-b border-cyber-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-600/30 border border-cyber-cyan/40 flex items-center justify-center shadow-glow-cyan group-hover:border-cyber-cyan transition-all">
              <ShieldCheck className="w-6 h-6 text-cyber-cyan animate-pulse-slow" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-lg font-bold tracking-wider text-white">TRUTHLENS</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyber-cyan/30 text-cyber-cyan font-mono font-semibold">AI</span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wide font-mono uppercase">Privacy Guardian</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-cyber-panel text-cyber-cyan border border-cyber-cyan/40 shadow-glow-cyan/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyber-cyan' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User & Settings Section */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/settings/privacy"
              className="p-2 rounded-lg text-slate-400 hover:text-cyber-cyan hover:bg-slate-800/50 border border-transparent hover:border-cyber-border transition-all"
              title="Privacy & Vault Settings"
            >
              <Sliders className="w-4 h-4" />
            </Link>

            <Link
              href="/auth"
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-mono border border-slate-700 bg-slate-900/60 hover:border-cyber-cyan/50 hover:bg-slate-800/80 transition-all text-slate-300"
            >
              <div className={`w-2 h-2 rounded-full ${user.isGuest ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
              <span className="truncate max-w-[120px]">{user.displayName}</span>
              {user.isGuest && (
                <span className="text-[10px] text-amber-400 bg-amber-400/10 px-1 rounded">DEMO</span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <Link
              href="/auth"
              className="px-2 py-1 text-xs font-mono text-slate-300 border border-slate-800 rounded"
            >
              {user.isGuest ? 'Demo' : 'Account'}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-cyber-border bg-[#080d1e]/95 px-4 pt-2 pb-4 space-y-1 backdrop-blur-2xl">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-cyber-panel text-cyber-cyan border border-cyber-cyan/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <Icon className="w-5 h-5 text-cyber-cyan" />
                <span>{link.name}</span>
              </Link>
            );
          })}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <Link
              href="/settings/privacy"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 text-xs text-slate-400 py-1"
            >
              <Sliders className="w-4 h-4 text-slate-400" />
              <span>Privacy & Vault Settings</span>
            </Link>
            <Link
              href="/auth"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-cyber-cyan"
            >
              {user.isGuest ? 'Sign In / Register' : 'My Account'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
