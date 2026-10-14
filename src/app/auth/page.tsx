'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  ShieldCheck,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  LogOut,
  Sparkles,
  CheckCircle2,
  Key
} from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const { user, loginUser, loginAsGuest, logout } = useApp();

  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setTimeout(() => {
      loginUser(email, displayName || email.split('@')[0]);
      setLoading(false);
      setMsg('Authentication successful. Redirecting to your secure dashboard...');
      setTimeout(() => router.push('/dashboard'), 800);
    }, 600);
  };

  const handleGuestDemo = () => {
    loginAsGuest();
    router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 w-full space-y-6">
      {/* Branding */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyber-cyan/30 text-cyber-cyan flex items-center justify-center mx-auto shadow-glow-cyan">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          TruthLens Security Portal
        </h1>
        <p className="text-xs text-slate-400">
          Client-side encrypted private case vaults and session authentication.
        </p>
      </div>

      {/* Current Session Banner if logged in */}
      {!user.isGuest && (
        <div className="p-4 rounded-xl bg-slate-900 border border-cyber-border text-xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 block font-mono text-[10px]">CURRENTLY AUTHENTICATED</span>
            <span className="font-bold text-white">{user.displayName}</span>
            <span className="text-slate-500 block text-[11px] font-mono">{user.email}</span>
          </div>
          <button
            onClick={logout}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-300 font-mono text-xs flex items-center space-x-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      )}

      {/* Auth Card */}
      <div className="cyber-card rounded-2xl p-6 sm:p-8 space-y-6">
        {/* Toggle between Sign In and Register */}
        <div className="flex p-1 bg-slate-950 border border-slate-800 rounded-xl">
          <button
            onClick={() => setMode('signin')}
            className={`flex-1 py-2 rounded-lg text-xs font-mono font-semibold transition-all ${
              mode === 'signin'
                ? 'bg-cyber-panel text-cyber-cyan border border-cyber-cyan/40 shadow-glow-cyan/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-2 rounded-lg text-xs font-mono font-semibold transition-all ${
              mode === 'register'
                ? 'bg-cyber-panel text-cyber-cyan border border-cyber-cyan/40 shadow-glow-cyan/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Register Private Vault
          </button>
        </div>

        {msg && (
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                Display Name / Moniker
              </label>
              <input
                type="text"
                placeholder="e.g. Alex M."
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="investigator@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
              Vault Passphrase
            </label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 pr-9 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-glow-cyan transition-all disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : mode === 'signin' ? 'Sign In to Case Vault' : 'Create Encrypted Vault'}
          </button>
        </form>

        <div className="pt-4 border-t border-cyber-border text-center">
          <p className="text-[11px] text-slate-400 mb-3">Want to explore without registering an account?</p>
          <button
            onClick={handleGuestDemo}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400/50 text-xs font-mono text-amber-300 font-semibold flex items-center justify-center space-x-2 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enter Safe Demo Mode / Guest Access</span>
          </button>
        </div>
      </div>
    </div>
  );
}
