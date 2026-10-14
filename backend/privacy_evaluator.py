"""
TruthLens AI — Digital Privacy Violation Assessment Engine
Evaluates reported privacy incidents, classifies violation types, assesses risk severity,
and produces immediate safety guidance and safe evidence-preservation protocols.
"""

from typing import Dict, Any, List, Optional
import re

class PrivacyEvaluator:
    VIOLATION_CATEGORIES = {
        "unauthorized_photo": {
            "title": "Unauthorized Publication of Personal Photographs",
            "base_severity": "Moderate",
            "statutory_context": "Right to Privacy / Likeness & Image Rights / Platform Community Standards"
        },
        "ncii": {
            "title": "Suspected Non-Consensual Intimate Imagery (NCII)",
            "base_severity": "Critical",
            "statutory_context": "Criminal statutes on non-consensual imagery / Immediate Platform Expedited Removal / STOPNCII hash protection"
        },
        "deepfake_misuse": {
            "title": "AI-Generated Face Swap or Synthetic Impersonation",
            "base_severity": "High",
            "statutory_context": "Synthetic Media Misleading Representation / Defamation / Right of Publicity"
        },
        "impersonation": {
            "title": "Impersonation and Fraudulent Profiles",
            "base_severity": "High",
            "statutory_context": "Identity Misuse / Terms of Service Impersonation Violation / Consumer Fraud"
        },
        "doxxing": {
            "title": "Publication of Personal Contact Details or Physical Address",
            "base_severity": "High",
            "statutory_context": "PII Exposure / Harassment & Stalking Statutes / Platform Doxxing Policies"
        },
        "harassment": {
            "title": "Targeted Harassment Involving Private Data",
            "base_severity": "High",
            "statutory_context": "Cyberbullying / Harassment Statutes / Platform Safety Rules"
        },
        "sensitive_documents": {
            "title": "Unauthorized Sharing of Sensitive Personal Documents",
            "base_severity": "Critical",
            "statutory_context": "Identity Theft Risk / Data Protection Acts (GDPR/CCPA) / Financial Fraud Risks"
        },
        "search_exposure": {
            "title": "Search Engine Indexing of Harmful Personal Data",
            "base_severity": "Moderate",
            "statutory_context": "Right to be Forgotten (GDPR Art 17) / Search Engine De-indexing Policies"
        }
    }

    DANGER_KEYWORDS = [
        "kill", "hurt", "suicide", "threat", "blackmail", "extort", "money", "stalk", "follow",
        "rape", "underage", "minor", "child", "address", "door", "weapon"
    ]

    def evaluate_incident(self, description: str, incident_type: str, platform: str, has_threats: bool = False, is_depicted: bool = True) -> Dict[str, Any]:
        normalized_desc = (description or "").lower()
        
        # 1. Check for immediate physical danger / extortion
        danger_signals = []
        for kw in self.DANGER_KEYWORDS:
            if re.search(r'\b' + re.escape(kw) + r'\b', normalized_desc):
                danger_signals.append(kw)
        
        is_emergency = has_threats or any(k in danger_signals for k in ["threat", "blackmail", "extort", "kill", "stalk"])

        # 2. Category mapping
        cat_info = self.VIOLATION_CATEGORIES.get(incident_type, {
            "title": "General Privacy Concern",
            "base_severity": "Moderate",
            "statutory_context": "Applicable Privacy and Data Protection Frameworks"
        })

        # 3. Severity scoring
        if is_emergency or incident_type in ["ncii", "sensitive_documents"]:
            calculated_severity = "Critical"
            severity_score = 92
        elif incident_type in ["deepfake_misuse", "impersonation", "doxxing", "harassment"]:
            calculated_severity = "High"
            severity_score = 75
        elif incident_type in ["unauthorized_photo", "search_exposure"]:
            calculated_severity = "Moderate"
            severity_score = 50
        else:
            calculated_severity = "Low"
            severity_score = 25

        if not is_depicted:
            severity_score = max(20, severity_score - 15)

        # 4. Immediate Safety Guidance
        immediate_safety_steps = []
        if is_emergency:
            immediate_safety_steps.extend([
                "EMERGENCY SAFETY NOTICE: If you are in immediate physical danger, contact your local emergency services (e.g., 911 / 999 / 112) immediately.",
                "DO NOT pay any ransom or send money in extortion or sextortion cases. Payment does NOT guarantee removal and often prompts further demands.",
                "Preserve all communication without deleting messages, but immediately cease interacting with the perpetrator.",
                "If non-consensual imagery or extortion is involved, register cryptographic hashes at StopNCII.org or TakeItDown.ncmec.org to preemptively block uploads across participating platforms."
            ])
        else:
            immediate_safety_steps.extend([
                "Secure your own accounts: Enable two-factor authentication (2FA) and update account passwords.",
                "Do not engage or argue publicly in comments, as engagement boosts algorithmic visibility.",
                "Capture timestamped evidence before notifying the host, as bad actors may delete or alter content when alerted."
            ])

        # 5. Safe Evidence Preservation Guidelines
        evidence_preservation_steps = [
            "Capture full screenshots that clearly show: URL bar, username, timestamp of post, and full context.",
            "Record the exact canonical URL (avoid shortened redirect links).",
            "CRITICAL: Redact unnecessary sensitive personal information (e.g., credit card numbers, children's faces, intimate details) from screenshots before uploading to any third party.",
            "Never distribute the infringing content to friends or social followers to ask for help; use direct 1-to-1 reporting channels."
        ]

        return {
            "assessment_id": f"PRIV-{re.sub(r'[^a-zA-Z0-9]', '', platform)[:6]}-{int(severity_score)}",
            "incident_category": incident_type,
            "category_title": cat_info["title"],
            "legal_context": cat_info["statutory_context"],
            "severity_level": calculated_severity,
            "severity_score": severity_score,
            "is_emergency_concern": is_emergency,
            "danger_signals_detected": danger_signals,
            "immediate_safety_steps": immediate_safety_steps,
            "evidence_preservation_guidelines": evidence_preservation_steps,
            "transparent_limitations": (
                "DISCLAIMER: This incident assessment is an automated privacy risk evaluation based on the information provided. "
                "It does not constitute legal adjudication, legal counsel, or a guarantee that a specific platform or court will rule in your favor. "
                "Platform decisions depend on their respective Terms of Service and applicable jurisdictional laws."
            ),
            "suggested_action": "Proceed to 'Remove Content Online' to generate a formal takedown request."
        }

privacy_evaluator = PrivacyEvaluator()
