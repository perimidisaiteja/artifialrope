"""
TruthLens AI — Guardian AI Chatbot Engine
Provides personalized digital privacy, takedown, evidence preservation, and follow-up guidance.
Supports Gemini Flash (1.5 / 2.0) with graceful fallback to deterministic legal/privacy rule engine.
"""

import os
import json
import httpx
from typing import List, Dict, Any, Optional

GUARDIAN_SYSTEM_PROMPT = """You are Guardian AI, an advanced digital privacy assistant developed for TruthLens AI.
Your core mission is to empower users to protect their personal privacy, investigate synthetic or manipulated media, safely preserve evidence, and navigate legitimate content-removal procedures.

Core Behavioral Principles:
1. Ask only for information strictly necessary to understand the incident.
2. Identify the content type, relevant platform, and the user's relationship to the content.
3. Provide step-by-step reporting instructions tailored to the specific platform using verified procedures.
4. Advise on safe evidence preservation (timestamps, URL, context) and remind users to REDACT sensitive personal details from screenshots.
5. Emphasize that users should NEVER recirculate or repost harmful/intimate content to prove their point.
6. Offer actionable follow-up steps if a platform rejects or ignores a removal request (appeals, hosting providers, de-indexing, StopNCII).
7. Clearly distinguish platform policy, legal information, and professional legal advice. (Always state you provide legal information, not legal counsel).
8. NEVER promise removal, invent laws, fabricate platform URLs, or claim that a report was submitted on their behalf.
9. If physical danger, extortion, or threats are detected, prioritize immediate emergency contact instructions.
"""

class GuardianBot:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
        # Default to free/flash models
        self.model_name = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")

    async def get_response(self, messages: List[Dict[str, str]], context: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Processes conversation history.
        Attempts Gemini API if key is available; falls back to Privacy Expert Engine seamlessly.
        """
        user_message = messages[-1]["content"] if messages else ""
        
        # Check if Gemini key is available
        if self.api_key and len(self.api_key.strip()) > 10:
            try:
                gemini_reply = await self._call_gemini(messages, context)
                if gemini_reply:
                    return {
                        "role": "assistant",
                        "message": gemini_reply,
                        "source": f"Guardian AI ({self.model_name})",
                        "suggested_actions": self._generate_suggested_actions(user_message)
                    }
            except Exception as e:
                # Log and fallback gracefully without failing
                print(f"[GuardianBot] Gemini API call failed or unavailable ({str(e)}). Falling back to Expert Engine.")

        # Fallback to Guardian Expert Privacy Engine
        expert_reply = self._expert_privacy_engine(user_message, messages, context)
        return {
            "role": "assistant",
            "message": expert_reply,
            "source": "Guardian AI (Forensic & Privacy Knowledge Engine)",
            "suggested_actions": self._generate_suggested_actions(user_message)
        }

    async def _call_gemini(self, messages: List[Dict[str, str]], context: Optional[Dict[str, Any]] = None) -> Optional[str]:
        # Formulate prompt using standard Google Generative Language REST API
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{self.model_name}:generateContent?key={self.api_key}"
        
        contents = []
        for m in messages[-8:]: # keep recent context window
            role = "user" if m.get("role") == "user" else "model"
            contents.append({
                "role": role,
                "parts": [{"text": m.get("content", "")}]
            })

        system_instruction = GUARDIAN_SYSTEM_PROMPT
        if context:
            system_instruction += f"\nCurrent active incident context: {json.dumps(context)}"

        payload = {
            "contents": contents,
            "system_instruction": {
                "parts": [{"text": system_instruction}]
            },
            "generationConfig": {
                "temperature": 0.3,
                "maxOutputTokens": 900,
            }
        }

        async with httpx.AsyncClient(timeout=15.0) as client:
            resp = await client.post(url, json=payload)
            if resp.status_code == 200:
                data = resp.json()
                candidates = data.get("candidates", [])
                if candidates:
                    parts = candidates[0].get("content", {}).get("parts", [])
                    if parts:
                        return parts[0].get("text", "")
        return None

    def _expert_privacy_engine(self, user_msg: str, history: List[Dict[str, str]], context: Optional[Dict[str, Any]] = None) -> str:
        """
        Comprehensive deterministic guidance engine covering the full spectrum of privacy incidents.
        """
        msg = user_msg.lower()

        # 1. Emergency / Blackmail / Sextortion
        if any(w in msg for w in ["blackmail", "extort", "money", "pay", "threaten to send", "sextortion"]):
            return (
                "### 🚨 Urgent Guidance: Extortion / Sextortion Response Protocol\n\n"
                "**1. Do NOT Pay Any Demanded Money or Cryptocurrencies**\n"
                "Paying does not guarantee removal; extortionists almost always escalate their demands once a victim pays.\n\n"
                "**2. Cease Interaction Immediately**\n"
                "Do not argue, negotiate, or send additional messages. Block the perpetrator on personal channels, but **do not delete the chat log** yet.\n\n"
                "**3. Preserve Critical Evidence Safely**\n"
                "- Screenshot the messages showing the threat, username, phone number, and profile URL.\n"
                "- Note down transaction wallets or payment handles if provided.\n\n"
                "**4. Preemptively Block Media with Cryptographic Hashes**\n"
                "- If intimate images or videos are threatened, submit their digital hashes to **[StopNCII.org](https://stopncii.org)** (for adults) or **[Take It Down](https://takeitdown.ncmec.org)** (for under 18s). This prevents the images from being uploaded across participating platforms (Meta, TikTok, OnlyFans, etc.) without your raw images leaving your device.\n\n"
                "**5. Official Platform Reporting**\n"
                "Navigate to our **Remove Content Online** tab to generate a formal emergency removal notice for the specific hosting platform."
            )

        # 2. Deepfake / AI Face-swap
        if any(w in msg for w in ["deepfake", "face swap", "ai generated", "synthetic", "manipulated", "altered"]):
            return (
                "### 🛡️ Investigating & Takedown of AI Deepfakes\n\n"
                "When someone creates or circulates a deepfake or AI face swap using your likeness, follow this structured process:\n\n"
                "**Step 1: Run Forensic Verification**\n"
                "Upload the suspect file to our **Analyze Media** tab. TruthLens AI evaluates Error Level Analysis (ELA), frequency noise discrepancies, and metadata to help corroborate artificial generation.\n\n"
                "**Step 2: Safe Evidence Collection**\n"
                "- Capture the permalink URL of the post.\n"
                "- Take a screenshot showing the post timestamp and account handle. **Do not repost or circulate the deepfake publicly** to dispute it, as engagement amplifies platform algorithms.\n\n"
                "**Step 3: Submit Platform-Specific Violation Reports**\n"
                "Most major platforms (Instagram, TikTok, YouTube, X, Reddit) maintain strict policies against **Deceptive & Synthetically Manipulated Media** and non-consensual likeness misappropriation:\n"
                "- Use our **Remove Content Online** section to generate a personalized *AI-Generated Deepfake Likeness Notice*.\n"
                "- Open the platform's verified reporting portal and submit the notice with your evidence reference."
            )

        # 3. Impersonation / Fake Profile
        if any(w in msg for w in ["impersonat", "fake profile", "fake account", "cloned account", "using my name"]):
            return (
                "### 👤 Handling Impersonation & Cloned Profiles\n\n"
                "If a fraudulent account is using your name, photos, or biographical details:\n\n"
                "**1. Gather the Comparison URLs**\n"
                "- Copy the exact URL of the impersonating account.\n"
                "- Have your authentic profile URL ready.\n\n"
                "**2. Official Platform Impersonation Procedures**\n"
                "- **Instagram / Facebook:** Visit their dedicated *Report Impersonation Account* web forms (accessible in our Platform Guide). Platforms typically require a quick photo ID verification to confirm you are the true individual.\n"
                "- **X (Twitter):** Submit a ticket via the *Impersonation Policy* portal.\n"
                "- **TikTok:** Tap the profile's Share icon -> Report -> Report Account -> Pretending to be someone else.\n\n"
                "**3. Avoid Public Confrontation**\n"
                "Do not warn the impersonator in direct messages; bad actors often rename the handle or block the victim to complicate evidence gathering. Capture screenshots first, then report."
            )

        # 4. Unauthorized Photo / Private Picture
        if any(w in msg for w in ["posted my photo", "unauthorized photo", "without permission", "my picture", "privacy photo"]):
            return (
                "### 📷 Removing Unauthorized Personal Photographs\n\n"
                "If someone posted a photo of you without your permission:\n\n"
                "**1. Determine the Context & Depiction**\n"
                "Are you clearly identifiable? If so, you have grounds under platform Privacy Guidelines and likeness rights.\n\n"
                "**2. Direct Reporting on the Platform**\n"
                "- Click the three dots (`...`) on the post and choose **Report** -> **Privacy violation** or **Unauthorized photo**.\n"
                "- If the in-app report is ignored, submit a formal privacy takedown letter directly to their Trust & Safety desk.\n\n"
                "**3. Evidence Redaction Reminder**\n"
                "Before archiving screenshots or attaching them to your case record, **redact** any unrelated private details (such as other bystanders or private contact numbers)."
            )

        # 5. Doxxing / Address / Phone number
        if any(w in msg for w in ["doxx", "dox", "phone number", "address", "personal information", "pii", "published my"]):
            return (
                "### 🔒 Urgent: Doxxing & Exposed Personal Information Protocol\n\n"
                "The unauthorized publication of home addresses, phone numbers, or private emails is a critical violation known as **Doxxing**.\n\n"
                "**Immediate Actions:**\n"
                "1. **Report for Expedited Doxxing Removal:** Major platforms treat doxxing with high priority due to physical safety risks. Choose *Report* -> *Sharing private personal info*.\n"
                "2. **De-index from Google & Bing:** If your address or number appears in web searches, submit an emergency de-indexing request via Google's *Results about you* tool or Search Troubleshooter.\n"
                "3. **Audit Your Online Footprint:** Consider placing fraud alerts on your credit files if sensitive financial or government IDs were exposed."
            )

        # 6. Rejection or Ignored Requests
        if any(w in msg for w in ["rejected", "ignored", "denied", "what next", "appealed", "no response"]):
            return (
                "### ⚖️ Next Steps When a Platform Rejects or Ignores Your Request\n\n"
                "It is frustrating when automated moderation misjudges a privacy claim. Here is the escalation pathway:\n\n"
                "**1. File an Internal Appeal**\n"
                "Most platforms offer a 14-day appeal window. Provide additional context explaining that *you* are the depicted individual and reiterate that no consent was given.\n\n"
                "**2. Target the Infrastructure / Web Hosting Provider**\n"
                "If an independent website ignores you, perform a WHOIS lookup to identify the underlying host (e.g., Cloudflare, AWS, Namecheap) and send a formal abuse notice to their Trust & Safety desk.\n\n"
                "**3. De-Index from Search Engines**\n"
                "Even if a rogue website refuses to take down content, Google and Bing can remove the URL from search queries of your name, effectively burying its accessibility.\n\n"
                "**4. Independent Oversight**\n"
                "For Meta platforms (Facebook / Instagram), eligible rejected appeals can be escalated to the Meta Oversight Board."
            )

        # Default intelligent response
        return (
            "### 🛡️ Guardian AI Privacy Assessment\n\n"
            "I am here to guide you through protecting your digital identity and removing unauthorized content.\n\n"
            "To give you the most accurate step-by-step guidance, please tell me:\n"
            "1. **What type of content is involved?** (e.g., unauthorized personal photo, deepfake face-swap, impersonation account, or exposed contact details)\n"
            "2. **Which platform or website is hosting it?** (e.g., Instagram, X, TikTok, Google Search, or an independent website)\n"
            "3. **Have you already submitted an in-app report?**\n\n"
            "*Reminder: Never post or upload raw intimate imagery or passwords into this chat. All guidance provided is factual and informational.*"
        )

    def _generate_suggested_actions(self, message: str) -> List[str]:
        msg = message.lower()
        if "deepfake" in msg or "photo" in msg:
            return [
                "Analyze this file in Forensic Lab",
                "Draft a formal takedown request",
                "How do I redact evidence before reporting?"
            ]
        elif "blackmail" in msg or "threat" in msg:
            return [
                "Register hash with StopNCII.org",
                "How to contact local cyber authorities",
                "Draft an emergency platform takedown"
            ]
        elif "rejected" in msg or "ignored" in msg:
            return [
                "Request Google Search De-indexing",
                "Identify website host via WHOIS",
                "Meta Oversight Board appeal guide"
            ]
        else:
            return [
                "Report unauthorized photo",
                "Report deepfake face-swap",
                "How to safely preserve evidence"
            ]

guardian_bot = GuardianBot()
