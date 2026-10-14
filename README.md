# TruthLens AI — Your Digital Privacy Guardian

> **"Your Face. Your Data. Your Rights."**
> *Detect suspicious digital media, protect your personal information, and take informed action against unauthorized online content.*

TruthLens AI is a production-oriented, futuristic web application designed to help internet users, students, creators, and individuals investigate potentially AI-generated or manipulated media, identify privacy violations, understand their rights, and navigate legitimate content-removal procedures.

---

## Key Capabilities

1. **AI-Powered Image and Video Authenticity Analysis**
   - Multi-spectral forensics: Error Level Analysis (ELA), high-frequency noise consistency, and chrominance boundary checks.
   - EXIF metadata and generative software fingerprinting (Midjourney, DALL-E, Stable Diffusion, Photoshop Generative Fill).
   - Content Credentials (C2PA) provenance validation.
   - Calibrated probabilistic confidence scoring with explicit uncertainty bounds.
   - Structured limitations disclaimer: explains why "No significant manipulation indicators detected" is never proof of authenticity.
   - Video container analysis and representative frame sampling.

2. **Digital Privacy Violation Assessment**
   - Triage for unauthorized personal photos, deepfakes / face-swaps, impersonation profiles, doxxing / exposed contact details, non-consensual intimate imagery (NCII), and sensitive documents.
   - Immediate emergency safety advisories for blackmail, extortion, or physical threats.
   - Safe evidence preservation instructions emphasizing redaction of sensitive third-party details.
   - Explicit limitation transparency: assessment does not constitute legal adjudication.

3. **Intelligent AI Privacy Assistant — Guardian AI**
   - Available via dedicated page (`/guardian`) and as a contextual floating assistant across all pages.
   - Tailored step-by-step guidance for individual platforms.
   - Powered by Gemini Flash (`gemini-1.5-flash` / `gemini-2.0-flash`) when an API key is provided, backed by an exhaustive deterministic legal & privacy knowledge engine that works 100% offline.
   - Distinguishes platform policy, legal information, and professional legal counsel.

4. **Guided Online Content-Removal Center ("Remove Content Online")**
   - **Step 1:** Select the incident category.
   - **Step 2:** Identify the platform (verified directory including Instagram, Facebook, TikTok, YouTube, X, Reddit, Google Search, Bing, and Independent Hosts).
   - **Step 3:** Collect minimum necessary information (strict zero-passwords / zero-intimate upload policy).
   - **Step 4:** Safe evidence preservation guidelines.
   - **Step 5:** Generate personalized, factual removal request drafts (8 distinct legal templates).
   - **Step 6:** User-controlled submission via official verified links.
   - **Step 7:** Incident lifecycle tracking (Draft, Ready to submit, Submitted by user, Awaiting response, Removed, Rejected, Escalated, Closed).

5. **Security & User Dashboard**
   - Active investigations feed with timeline milestones.
   - Recent media forensic reports.
   - Encrypted evidence vault with customizable retention schedules (7, 30, 60, 90 days).
   - One-click zero-trace vault destruction.
   - Safe Guest Demo Mode with benchmark sample datasets.

---

## Project Structure

```
hack/
├── backend/
│   ├── main.py                     # FastAPI application endpoints & SSRF protection
│   ├── detector.py                 # Digital media forensics engine (ELA, noise, EXIF, C2PA)
│   ├── privacy_evaluator.py        # Privacy risk & severity triage engine
│   ├── guardian_bot.py             # Guardian AI assistant (Gemini Flash + Expert Engine)
│   ├── takedown_templates.py       # 8 formal removal letter templates
│   └── platform_directory.json     # Verified platform URLs, escalation routes, and steps
├── src/
│   ├── app/
│   │   ├── page.tsx                # Futuristic landing page with live interactive demo
│   │   ├── analyze/page.tsx        # Image and video media forensics lab
│   │   ├── privacy-check/page.tsx  # Incident privacy assessment & severity triage
│   │   ├── remove-content/page.tsx # 7-step guided takedown workflow
│   │   ├── guardian/page.tsx       # Dedicated Guardian AI chatbot
│   │   ├── dashboard/page.tsx      # User security and investigation dashboard
│   │   ├── investigations/[id]/    # Case chronology timeline & evidence vault
│   │   ├── requests/page.tsx       # Removal request tracking & filtering
│   │   ├── platform-guide/page.tsx # Verified platform directory & instructions
│   │   ├── settings/privacy/       # Retention schedules, API key, & data purge
│   │   ├── auth/page.tsx           # Private vault auth & guest demo mode
│   │   ├── layout.tsx              # Root layout with HUD navbar and floating widget
│   │   └── globals.css             # Cyber-forensics dark theme styling
│   ├── components/
│   │   ├── Navbar.tsx              # Navigation bar with system status HUD
│   │   ├── Footer.tsx              # Security footer with disclaimers & resources
│   │   └── FloatingGuardian.tsx    # Contextual assistant widget
│   ├── context/
│   │   └── AppContext.tsx          # State management & LocalStorage persistence
│   ├── data/
│   │   ├── platforms.ts            # Verified platform data
│   │   └── sampleReports.ts        # Precomputed benchmark forensic samples
│   ├── lib/
│   │   └── api.ts                  # Resilient API client with seamless fallbacks
│   └── types/
│       └── index.ts                # TypeScript interfaces
├── run_truthlens.bat               # Unified startup batch script
├── package.json
└── tsconfig.json
```

---

## Getting Started

### 1. Prerequisites
- **Node.js** (v20+ LTS recommended)
- **Python** (3.11+ / 3.12 / 3.14)

### 2. Running TruthLens AI
Double-click `run_truthlens.bat` or run the following in separate terminal windows:

**Terminal 1 — Backend:**
```powershell
py -m uvicorn backend.main:app --host 127.0.0.1 --port 8000
```

**Terminal 2 — Frontend:**
```powershell
npm run start
```

Visit **`http://localhost:3000`** in your browser.

---

## Privacy Architecture Guarantees
- **No Model Training:** Uploaded photos, videos, and descriptions are never used to train machine learning models.
- **SSRF Safeguards:** URL inspection strictly blocks internal IP ranges (127.0.0.1, 10.x, 192.168.x, 169.254.x).
- **Client-Side Vault:** Case records and evidence are kept strictly within your private session or encrypted browser storage.
- **Probabilistic Transparency:** Scores are accompanied by calibrated uncertainty margins, and "no indicators" is never equated with proof of authenticity.
