'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  Investigation,
  MediaAnalysisReport,
  RemovalRequest,
  EvidenceItem,
  ChatMessage,
  IncidentType,
  RemovalStatus
} from '@/types';

interface AppContextType {
  user: UserProfile;
  investigations: Investigation[];
  mediaAnalyses: MediaAnalysisReport[];
  removalRequests: RemovalRequest[];
  evidenceItems: EvidenceItem[];
  chatMessages: ChatMessage[];
  addInvestigation: (data: Partial<Investigation>) => Investigation;
  updateInvestigationStatus: (id: string, status: Investigation['status']) => void;
  addMediaAnalysis: (analysis: MediaAnalysisReport) => void;
  createRemovalRequest: (data: Partial<RemovalRequest>) => RemovalRequest;
  updateRemovalRequestStatus: (id: string, status: RemovalStatus, notes?: string) => void;
  addEvidenceItem: (evidence: Partial<EvidenceItem>) => EvidenceItem;
  deleteEvidenceItem: (id: string) => void;
  addChatMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearChatHistory: () => void;
  clearAllUserData: () => void;
  updateUserSettings: (settings: Partial<UserProfile>) => void;
  loginAsGuest: () => void;
  loginUser: (email: string, displayName: string) => void;
  logout: () => void;
}

const DEFAULT_GUEST: UserProfile = {
  id: 'guest-session-01',
  displayName: 'Anonymous Investigator',
  email: 'guest@truthlens.local',
  isGuest: true,
  retentionDays: 30,
  anonymizeData: true
};

const INITIAL_INVESTIGATIONS: Investigation[] = [
  {
    id: 'INV-2026-081',
    userId: 'guest-session-01',
    title: 'Instagram Deepfake Face-Swap Misuse',
    incidentType: 'deepfake_misuse',
    platform: 'Instagram',
    contentUrl: 'https://instagram.com/p/C8k_example_demo',
    description: 'A synthetic video using my facial likeness in an altered setting without authorization.',
    severity: 'High',
    status: 'In Progress',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    evidenceCount: 2,
    timeline: [
      {
        id: 't-1',
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
        title: 'Investigation Initiated',
        description: 'Case created and initial forensic scan conducted.',
        type: 'created'
      },
      {
        id: 't-2',
        timestamp: new Date(Date.now() - 86400000 * 1.5).toISOString(),
        title: 'Forensic Report Attached',
        description: 'Analyzed with 87% synthetic probability indicator.',
        type: 'evidence_added'
      },
      {
        id: 't-3',
        timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
        title: 'Takedown Notice Generated',
        description: 'Drafted formal Deepfake Misuse Notice for Meta Trust & Safety.',
        type: 'draft_generated'
      }
    ]
  },
  {
    id: 'INV-2026-082',
    userId: 'guest-session-01',
    title: 'Doxxing Contact Information on Public Forum',
    incidentType: 'doxxing',
    platform: 'Reddit',
    contentUrl: 'https://reddit.com/r/example/comments/demo99',
    description: 'Phone number and home address posted in a public comments thread.',
    severity: 'Critical',
    status: 'Escalated',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    evidenceCount: 1,
    timeline: [
      {
        id: 't-4',
        timestamp: new Date(Date.now() - 86400000 * 5).toISOString(),
        title: 'Urgent Doxxing Case Filed',
        description: 'High priority incident triage triggered.',
        type: 'created'
      },
      {
        id: 't-5',
        timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
        title: 'De-Indexing Notice Filed',
        description: 'Submitted Google and Bing search removal requests.',
        type: 'submitted'
      }
    ]
  }
];

const INITIAL_REQUESTS: RemovalRequest[] = [
  {
    id: 'REQ-INSTA-992',
    investigationId: 'INV-2026-081',
    platform: 'instagram',
    platformName: 'Instagram',
    incidentType: 'deepfake_misuse',
    reportingUrl: 'https://help.instagram.com/contact/383679321740945',
    contentUrl: 'https://instagram.com/p/C8k_example_demo',
    accountHandle: '@suspect_ai_creator',
    editableDraft: `To: Instagram Trust & Safety Team\nDate: October 14, 2026\nSubject: Formal Notice Regarding Non-Consensual AI-Generated / Deepfake Media\n\nDear Content Moderation Team,\n\nI am writing to formally request the immediate removal of synthetic / AI-generated media depicting my likeness, published without my knowledge, authorization, or consent.\n\nURL: https://instagram.com/p/C8k_example_demo\nAccount: @suspect_ai_creator\n\nThe media uses digital manipulation / facial swap technology to superimpose my likeness without consent. This constitutes defamation, harassment, and an infringement of personal likeness rights.`,
    status: 'Ready to submit',
    externalReference: 'REF-IG-884210',
    notes: 'Official webform link bookmarked. Awaiting final user submission confirmation.',
    lastUpdatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 1.5).toISOString()
  }
];

const INITIAL_EVIDENCE: EvidenceItem[] = [
  {
    id: 'EVD-991',
    investigationId: 'INV-2026-081',
    filename: 'instagram_post_context_redacted.png',
    contentType: 'image/png',
    fileSizeBytes: 421000,
    retentionDeadline: new Date(Date.now() + 86400000 * 28).toISOString(),
    sha256Hash: 'a7c933...71e',
    redacted: true,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    notes: 'Captured full post timestamp with profile handle. Third-party bystander faces redacted.'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile>(DEFAULT_GUEST);
  const [investigations, setInvestigations] = useState<Investigation[]>(INITIAL_INVESTIGATIONS);
  const [mediaAnalyses, setMediaAnalyses] = useState<MediaAnalysisReport[]>([]);
  const [removalRequests, setRemovalRequests] = useState<RemovalRequest[]>(INITIAL_REQUESTS);
  const [evidenceItems, setEvidenceItems] = useState<EvidenceItem[]>(INITIAL_EVIDENCE);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: 'Welcome to Guardian AI. I am your specialized digital privacy and media authenticity advisor.\n\nWhether you need to investigate a suspicious deepfake, remove an unauthorized personal photo, address impersonation, or safely document privacy violations, I am here to assist with verified step-by-step procedures.\n\nHow can I help protect your digital identity today?',
      timestamp: new Date().toISOString(),
      suggested_actions: [
        'Someone posted my photo without permission',
        'I think someone created a deepfake using my face',
        'A website published my phone number and address',
        'How should I safely preserve evidence?'
      ]
    }
  ]);

  // Load from LocalStorage if available
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('truthlens_user');
      const savedInvs = localStorage.getItem('truthlens_investigations');
      const savedAnalyses = localStorage.getItem('truthlens_analyses');
      const savedReqs = localStorage.getItem('truthlens_requests');
      const savedEvd = localStorage.getItem('truthlens_evidence');
      const savedChat = localStorage.getItem('truthlens_chat');

      if (savedUser) setUser(JSON.parse(savedUser));
      if (savedInvs) setInvestigations(JSON.parse(savedInvs));
      if (savedAnalyses) setMediaAnalyses(JSON.parse(savedAnalyses));
      if (savedReqs) setRemovalRequests(JSON.parse(savedReqs));
      if (savedEvd) setEvidenceItems(JSON.parse(savedEvd));
      if (savedChat) setChatMessages(JSON.parse(savedChat));
    } catch (e) {
      console.warn('LocalStorage retrieval fallback active', e);
    }
  }, []);

  // Save to LocalStorage helpers
  const saveState = (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`LocalStorage write error for ${key}`, e);
    }
  };

  const addInvestigation = (data: Partial<Investigation>): Investigation => {
    const newInv: Investigation = {
      id: `INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      userId: user.id,
      title: data.title || 'Untitled Privacy Case',
      incidentType: data.incidentType || 'unauthorized_photo',
      platform: data.platform || 'General Web',
      contentUrl: data.contentUrl || '',
      description: data.description || '',
      severity: data.severity || 'Moderate',
      status: 'Open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      evidenceCount: 0,
      timeline: [
        {
          id: `tl-${Date.now()}`,
          timestamp: new Date().toISOString(),
          title: 'Case Created',
          description: 'Privacy incident recorded in secure vault.',
          type: 'created'
        }
      ],
      ...data
    };

    const updated = [newInv, ...investigations];
    setInvestigations(updated);
    saveState('truthlens_investigations', updated);
    return newInv;
  };

  const updateInvestigationStatus = (id: string, status: Investigation['status']) => {
    const updated = investigations.map(inv => {
      if (inv.id === id) {
        return {
          ...inv,
          status,
          updatedAt: new Date().toISOString(),
          timeline: [
            ...inv.timeline,
            {
              id: `tl-${Date.now()}`,
              timestamp: new Date().toISOString(),
              title: `Status Changed to ${status}`,
              description: `Case updated by investigator.`,
              type: 'status_change' as const
            }
          ]
        };
      }
      return inv;
    });
    setInvestigations(updated);
    saveState('truthlens_investigations', updated);
  };

  const addMediaAnalysis = (analysis: MediaAnalysisReport) => {
    const updated = [analysis, ...mediaAnalyses];
    setMediaAnalyses(updated);
    saveState('truthlens_analyses', updated);
  };

  const createRemovalRequest = (data: Partial<RemovalRequest>): RemovalRequest => {
    const newReq: RemovalRequest = {
      id: `REQ-${(data.platform || 'WEB').toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      investigationId: data.investigationId || 'GENERAL',
      platform: data.platform || 'independent_website',
      platformName: data.platformName || 'General Host',
      incidentType: data.incidentType || 'unauthorized_photo',
      reportingUrl: data.reportingUrl || '',
      contentUrl: data.contentUrl || '',
      editableDraft: data.editableDraft || '',
      status: 'Ready to submit',
      createdAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
      ...data
    };

    const updated = [newReq, ...removalRequests];
    setRemovalRequests(updated);
    saveState('truthlens_requests', updated);
    return newReq;
  };

  const updateRemovalRequestStatus = (id: string, status: RemovalStatus, notes?: string) => {
    const updated = removalRequests.map(req => {
      if (req.id === id) {
        return {
          ...req,
          status,
          notes: notes !== undefined ? notes : req.notes,
          lastUpdatedAt: new Date().toISOString()
        };
      }
      return req;
    });
    setRemovalRequests(updated);
    saveState('truthlens_requests', updated);
  };

  const addEvidenceItem = (evidence: Partial<EvidenceItem>): EvidenceItem => {
    const newItem: EvidenceItem = {
      id: `EVD-${Math.floor(100 + Math.random() * 900)}`,
      filename: evidence.filename || 'evidence_capture.png',
      contentType: evidence.contentType || 'image/png',
      fileSizeBytes: evidence.fileSizeBytes || 102400,
      retentionDeadline: new Date(Date.now() + (user.retentionDays || 30) * 86400000).toISOString(),
      sha256Hash: evidence.sha256Hash || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      redacted: evidence.redacted ?? true,
      createdAt: new Date().toISOString(),
      ...evidence
    };

    const updated = [newItem, ...evidenceItems];
    setEvidenceItems(updated);
    saveState('truthlens_evidence', updated);
    return newItem;
  };

  const deleteEvidenceItem = (id: string) => {
    const updated = evidenceItems.filter(e => e.id !== id);
    setEvidenceItems(updated);
    saveState('truthlens_evidence', updated);
  };

  const addChatMessage = (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...msg
    };
    const updated = [...chatMessages, newMsg];
    setChatMessages(updated);
    saveState('truthlens_chat', updated);
  };

  const clearChatHistory = () => {
    setChatMessages([]);
    localStorage.removeItem('truthlens_chat');
  };

  const clearAllUserData = () => {
    localStorage.clear();
    setUser(DEFAULT_GUEST);
    setInvestigations([]);
    setMediaAnalyses([]);
    setRemovalRequests([]);
    setEvidenceItems([]);
    setChatMessages([]);
  };

  const updateUserSettings = (settings: Partial<UserProfile>) => {
    const updated = { ...user, ...settings };
    setUser(updated);
    saveState('truthlens_user', updated);
  };

  const loginAsGuest = () => {
    setUser(DEFAULT_GUEST);
    saveState('truthlens_user', DEFAULT_GUEST);
  };

  const loginUser = (email: string, displayName: string) => {
    const authUser: UserProfile = {
      id: `usr-${Date.now()}`,
      displayName,
      email,
      isGuest: false,
      retentionDays: 60,
      anonymizeData: true
    };
    setUser(authUser);
    saveState('truthlens_user', authUser);
  };

  const logout = () => {
    loginAsGuest();
  };

  return (
    <AppContext.Provider
      value={{
        user,
        investigations,
        mediaAnalyses,
        removalRequests,
        evidenceItems,
        chatMessages,
        addInvestigation,
        updateInvestigationStatus,
        addMediaAnalysis,
        createRemovalRequest,
        updateRemovalRequestStatus,
        addEvidenceItem,
        deleteEvidenceItem,
        addChatMessage,
        clearChatHistory,
        clearAllUserData,
        updateUserSettings,
        loginAsGuest,
        loginUser,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
