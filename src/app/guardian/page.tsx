'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { sendGuardianChat } from '@/lib/api';
import {
  MessageSquare,
  Bot,
  User,
  Send,
  Trash2,
  Download,
  ShieldCheck,
  AlertTriangle,
  Lock,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Info,
  Loader2
} from 'lucide-react';

export default function GuardianPage() {
  const { chatMessages, addChatMessage, clearChatHistory } = useApp();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, loading]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim() || loading) return;

    setInput('');
    addChatMessage({
      role: 'user',
      content: textToSend
    });

    setLoading(true);
    try {
      const history = chatMessages.map((m) => ({ role: m.role, content: m.content }));
      history.push({ role: 'user', content: textToSend });

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
        content:
          'I apologize, but an unexpected error occurred communicating with the advisor model. You can still use our Remove Content Online tool for manual notice generation.',
        source: 'Guardian AI System Fallback'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExportChat = () => {
    const text = chatMessages
      .map((m) => `[${m.role.toUpperCase()} - ${new Date(m.timestamp).toLocaleString()}]\n${m.content}\n`)
      .join('\n---\n\n');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Guardian_AI_Consultation_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const promptStarters = [
    'Someone posted my photo without my permission. What can I do?',
    'I think someone created a deepfake using my face.',
    'How can I report a fake Instagram profile using my identity?',
    'A website published my phone number and address.',
    'What evidence should I preserve before reporting it?',
    'The platform rejected my removal request. What should I do next?'
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 flex flex-col">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-cyber-border gap-4 mb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-cyan-500/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono mb-2">
            <Bot className="w-3.5 h-3.5" />
            <span>AI PRIVACY ADVISOR</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Guardian AI
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Personalized guidance on takedown workflows, safe evidence gathering, and digital privacy rights.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <button
            onClick={handleExportChat}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyber-cyan/50 text-xs text-slate-300 transition-all"
            title="Export conversation history"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
          <button
            onClick={clearChatHistory}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-rose-500/50 hover:text-rose-400 text-xs text-slate-400 transition-all"
            title="Clear conversation history"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Advisory Notice */}
      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Guardian AI provides verified policy and legal information, not formal legal counsel. Uploads are strictly confidential.</span>
        </div>
        <span className="font-mono text-cyan-400 hidden sm:inline">ZERO MODEL TRAINING</span>
      </div>

      {/* Chat Messages Container */}
      <div className="cyber-card rounded-2xl flex-1 flex flex-col overflow-hidden min-h-[500px]">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {chatMessages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                    isUser
                      ? 'bg-cyan-600/20 border-cyan-400/40 text-cyan-300'
                      : 'bg-violet-600/20 border-violet-400/40 text-violet-300'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-[85%] sm:max-w-[75%] space-y-2`}>
                  <div
                    className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none'
                        : 'bg-slate-900/90 text-slate-200 border border-cyber-border rounded-tl-none shadow-md'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>

                  {/* Metadata and source badge */}
                  {!isUser && msg.source && (
                    <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-mono pl-1">
                      <span>{msg.source}</span>
                      <span>•</span>
                      <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                    </div>
                  )}

                  {/* Suggested Quick Prompts */}
                  {!isUser && msg.suggested_actions && msg.suggested_actions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.suggested_actions.map((act, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(act)}
                          className="text-[11px] font-medium bg-cyan-500/10 hover:bg-cyan-500/20 text-cyber-cyan border border-cyber-cyan/30 rounded-lg px-2.5 py-1 text-left transition-all"
                        >
                          {act}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-xl bg-violet-600/20 border border-violet-400/40 text-violet-300 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="rounded-2xl p-4 bg-slate-900/90 border border-cyber-border rounded-tl-none text-xs text-slate-400 flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-cyber-cyan" />
                <span>Guardian AI is analyzing platform rules & drafting advice...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Starters Carousel */}
        {chatMessages.length <= 2 && (
          <div className="px-6 py-2 border-t border-slate-800 bg-slate-950/60">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
              Common Privacy Inquiries:
            </span>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {promptStarters.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-cyber-cyan text-xs text-slate-300 hover:text-white transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Input Bar */}
        <div className="p-4 bg-[#050813] border-t border-cyber-border">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Guardian about removals, doxxing, deepfakes, or evidence preservation..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan leading-normal"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-glow-cyan disabled:opacity-40 flex items-center space-x-1.5 transition-all"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
          <div className="mt-2 text-[10px] text-slate-500 text-center font-mono">
            Do not upload confidential passwords, session tokens, or explicit images.
          </div>
        </div>
      </div>
    </div>
  );
}
