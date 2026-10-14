'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { sendGuardianChat } from '@/lib/api';
import {
  MessageSquare,
  X,
  Send,
  ShieldCheck,
  Maximize2,
  Bot,
  User,
  Sparkles,
  Loader2
} from 'lucide-react';

export default function FloatingGuardian() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { chatMessages, addChatMessage } = useApp();

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    setInput('');
    addChatMessage({
      role: 'user',
      content: query
    });

    setLoading(true);
    try {
      const history = chatMessages.map(m => ({ role: m.role, content: m.content }));
      history.push({ role: 'user', content: query });
      
      const res = await sendGuardianChat(history);
      addChatMessage({
        role: 'assistant',
        content: res.message,
        source: res.source,
        suggested_actions: res.suggested_actions
      });
    } catch (e) {
      addChatMessage({
        role: 'assistant',
        content: 'I apologize, but I encountered an issue connecting to the inference engine. You can still navigate to Remove Content Online to manually draft your complaint.',
        source: 'Guardian AI System Fallback'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-medium shadow-glow-cyan hover:scale-105 active:scale-95 transition-all border border-cyan-300/40"
        >
          <Bot className="w-5 h-5 text-white" />
          <span className="text-xs font-semibold tracking-wide">Guardian AI</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="w-[380px] sm:w-[420px] h-[540px] flex flex-col rounded-2xl bg-[#090e20] border border-cyber-border shadow-2xl overflow-hidden backdrop-blur-2xl">
          {/* Header */}
          <div className="px-4 py-3 bg-[#0d1633] border-b border-cyber-border flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyber-cyan/40 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-cyber-cyan" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white flex items-center space-x-1.5">
                  <span>Guardian AI Assistant</span>
                  <span className="text-[9px] bg-cyan-500/20 text-cyber-cyan px-1.5 py-0.2 rounded font-mono">LIVE</span>
                </h3>
                <p className="text-[10px] text-slate-400">Contextual Privacy Advisor</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Link
                href="/guardian"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded"
                title="Open Dedicated Full Page"
              >
                <Maximize2 className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded"
                aria-label="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 text-xs">
            {chatMessages.slice(-6).map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2.5 leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-cyan-600 text-white rounded-br-none'
                      : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
                {msg.suggested_actions && msg.suggested_actions.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {msg.suggested_actions.map((act, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(act)}
                        className="text-[10px] font-medium bg-cyan-500/10 hover:bg-cyan-500/20 text-cyber-cyan border border-cyber-cyan/30 rounded-md px-2 py-1 text-left transition-all"
                      >
                        {act}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-center space-x-2 text-slate-400 text-xs">
                <Loader2 className="w-4 h-4 animate-spin text-cyber-cyan" />
                <span>Guardian AI is evaluating privacy pathways...</span>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-1.5 border-t border-slate-800/60 bg-slate-900/60 flex items-center space-x-1 overflow-x-auto text-[11px] whitespace-nowrap">
            <button
              onClick={() => handleSend("Someone posted my photo without permission. What can I do?")}
              className="text-slate-400 hover:text-cyber-cyan hover:bg-slate-800 px-2 py-0.5 rounded transition-all"
            >
              Unauthorized Photo
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => handleSend("I suspect someone created a deepfake using my face.")}
              className="text-slate-400 hover:text-cyber-cyan hover:bg-slate-800 px-2 py-0.5 rounded transition-all"
            >
              Deepfake
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => handleSend("A website published my personal address and phone number.")}
              className="text-slate-400 hover:text-cyber-cyan hover:bg-slate-800 px-2 py-0.5 rounded transition-all"
            >
              Doxxing
            </button>
          </div>

          {/* Input Footer */}
          <div className="p-2.5 bg-[#080d1e] border-t border-cyber-border flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Guardian about removals or privacy..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="p-2 rounded-lg bg-cyber-cyan text-slate-950 font-bold hover:bg-cyan-300 disabled:opacity-40 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
