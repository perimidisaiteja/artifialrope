"""
TruthLens AI — Personalized Removal Letter & Notice Generator
Contains 8 distinct, formal, legally grounded takedown templates with editable placeholders.
Adheres strictly to factual claims without inventing statutes or falsely claiming legal representation.
"""

from typing import Dict, Any

TEMPLATES = {
    "unauthorized_photo": {
        "title": "Unauthorized Personal Image Removal Request",
        "category": "Image Privacy & Likeness Rights",
        "content": """To: [Platform Trust & Safety / Support Team]
Date: [Current Date]
Subject: Formal Request for Removal of Unauthorized Personal Image

Dear Trust and Safety Team,

I am writing to formally request the removal of personal media depicting myself that has been published on your platform without my knowledge or consent.

1. LOCATION OF INFRINGING CONTENT:
URL: [Insert Content URL]
Account / Profile Name: [Insert Posting Account Name]
Timestamp of Post: [Insert Timestamp or Approximate Date]

2. STATEMENT OF RELATIONSHIP:
I am the individual clearly depicted in the aforementioned photograph/video. I have never granted authorization, license, or consent for my likeness to be published, distributed, or monetized on this platform or by the account holder.

3. POLICY VIOLATION:
This publication violates your platform's Community Guidelines and Privacy Policies regarding unauthorized publication of private personal images, as well as applicable privacy regulations protecting individuals from non-consensual commercial or public exploitation of their likeness.

4. REQUESTED ACTION:
I respectfully request that you:
a) Promptly remove or permanently disable public access to the specified content URL.
b) Issue a formal confirmation email acknowledging receipt of this notice and confirming the action taken.
c) Provide a unique case or ticket reference number for my records.

Thank you for your prompt attention to this matter.

Sincerely,
[Your Full Name]
Contact Email: [Your Email Address]
Reference Case ID: [Generated Case ID]"""
    },

    "impersonation": {
        "title": "Impersonation and Identity Theft Notice",
        "category": "Identity Protection",
        "content": """To: [Platform Trust & Safety / Abuse Team]
Date: [Current Date]
Subject: Urgent Notice of Impersonation and Identity Fraud

Dear Trust & Safety Department,

I am writing to report a fraudulent account currently operating on your platform that is impersonating my personal identity.

1. IMPERSONATING PROFILE DETAILS:
Profile URL: [Insert Impersonating Profile URL]
Display Name / Handle: [Insert Impersonating Handle]

2. AUTHENTIC IDENTITY INFORMATION:
My Authentic Profile (if applicable): [Insert Your Real Profile URL, or state 'N/A']
My Legal Name: [Your Full Name]

3. EVIDENCE OF IMPERSONATION:
The profile in question has misappropriated my name, personal photographs, and biographical information without my consent, leading other users to falsely believe the account is managed or endorsed by me. This activity misleads the public and constitutes identity theft and fraud under your Terms of Service.

4. REQUESTED REMOVAL:
Pursuant to your platform's policies prohibiting deceptive impersonation:
a) Permanently suspend or terminate the reported account.
b) Ensure all associated media and posts originating from this fraudulent identity are removed.
c) Provide confirmation of resolution and case reference number.

I declare under penalty of perjury or good faith belief that the information in this notice is accurate and that I am the individual being impersonated.

Sincerely,
[Your Full Name]
Contact Email: [Your Email Address]
Reference ID: [Generated Case ID]"""
    },

    "deepfake_misuse": {
        "title": "AI-Generated Deepfake / Synthetic Likeness Removal Request",
        "category": "Synthetic Media Misuse",
        "content": """To: [Platform Legal & Content Moderation Team]
Date: [Current Date]
Subject: Formal Notice Regarding Non-Consensual AI-Generated / Deepfake Media

Dear Content Moderation Team,

I am writing to formally request the immediate removal of synthetic / AI-generated media depicting my likeness, published without my knowledge, authorization, or consent.

1. LOCATION OF SYNTHETIC MEDIA:
URL: [Insert Content URL]
Author / Account: [Insert Account Handle]
Media Type: [Image / Video / Audio / Face-Swap]

2. FACTUAL DECLARATION:
The media at the above link uses digital manipulation, generative AI, or facial-swap technology to superimpose my face/likeness onto content I never participated in or consented to.
Forensic evaluation of this media shows visual and structural artifacts consistent with digital manipulation.

3. HARM AND PLATFORM POLICY BREACH:
Distributing synthetic media depicting a real individual without clear, prominent disclosure violates your platform's policies against Deceptive / Manipulated Media and constitutes defamation, harassment, and an egregious infringement on personal likeness rights.

4. REQUIRED ACTIONS:
a) Immediately take down or disable access to the infringing media.
b) Apply platform hashing or screening to prevent re-upload of this synthetic asset.
c) Confirm action with a formal case reference number.

Respectfully submitted,
[Your Full Name]
Contact Email: [Your Email Address]
Forensic Report ID: [Generated Case ID]"""
    },

    "ncii": {
        "title": "Non-Consensual Intimate Imagery (NCII) Expedited Removal Notice",
        "category": "Intimate Privacy Violation",
        "content": """PRIORITY ESCALATION — IMMEDIATE ACTION REQUESTED
To: [Platform Safety & Law Enforcement Response Team]
Date: [Current Date]
Subject: URGENT: Non-Consensual Intimate Imagery (NCII) / Sextortion Removal

Dear Safety Operations Team,

This is an urgent formal notification that explicit or intimate media depicting myself is being hosted or circulated on your platform without my consent.

1. VIOLATING URL(S):
Content Link: [Insert Direct Post URL]
Profile URL: [Insert Profile URL of poster]

2. AFFIDAVIT OF NON-CONSENT:
I am the person depicted in the intimate image(s)/video(s) at the link above. I have NEVER consented to the public distribution, display, or sharing of this intimate content. 

3. STATUTORY AND POLICY VIOLATION:
The hosting or distribution of non-consensual intimate imagery is a strict violation of your Terms of Service, Community Standards, and in many jurisdictions constitutes a criminal offense (non-consensual pornography / voyeurism / extortion).

4. IMMEDIATE REQUEST:
Under your emergency NCII / Safety enforcement guidelines:
a) Immediately remove and de-index the content across all your services.
b) Add the image/video hash to your internal blocklists (and cross-reference with StopNCII / Take It Down).
c) Preserve server logs and metadata relating to the uploader for potential law enforcement subpoena.
d) Provide immediate email confirmation of removal.

Urgent contact:
[Your Name / Initial]
Contact Email: [Your Secure Email Address]
Case Ref: [Generated Case ID]"""
    },

    "doxxing": {
        "title": "Exposed Personal Contact Information (Doxxing) Takedown Request",
        "category": "Personal Information (PII) Exposure",
        "content": """To: [Platform Safety & Privacy Operations]
Date: [Current Date]
Subject: Urgent Request: Removal of Doxxed Personal Information / PII

Dear Safety Operations,

I am writing to request the immediate redaction and removal of sensitive personally identifiable information (PII) that has been published without my consent on your platform.

1. CONTENT URL:
URL: [Insert Offending Post or Comment URL]
Account Responsible: [Insert Poster Handle]

2. EXPOSED SENSITIVE DATA:
The post publicly discloses my confidential personal details, specifically:
[ ] Residential / Home Address
[ ] Personal Telephone Number
[ ] Private Email Address
[ ] Employment / Workplace Details
[ ] Government ID or Financial Details

3. SAFETY RISK:
Publishing this information exposes me and my household to targeted harassment, swatting, stalking, and potential physical harm. This is a severe breach of your platform's prohibitions against doxxing and malicious sharing of private information.

4. REQUESTED RESOLUTION:
a) Immediately delete the post containing the exposed information.
b) Remove any cached or archived versions within your internal content delivery networks.
c) Provide confirmation of removal and case reference.

Thank you for your prompt response to protect personal safety.

Sincerely,
[Your Full Name]
Contact Email: [Your Email Address]
Case ID: [Generated Case ID]"""
    },

    "fake_profile": {
        "title": "Fraudulent / Cloned Profile Removal Request",
        "category": "Account Deception",
        "content": """To: [Platform Moderation & Security Team]
Date: [Current Date]
Subject: Report of Cloned / Deceptive Profile

Dear Moderation Team,

Please review and remove the following cloned profile which has duplicated my identity to deceive other members of your community.

1. FRAUDULENT ACCOUNT:
Profile URL: [Insert Fake Profile Link]
Username / Handle: [Insert Handle]

2. ORIGINAL ACCOUNT BEING CLONED:
Authentic Account URL: [Insert Real Profile Link]

3. DECEPTIVE CONDUCT:
The fraudulent account has copied my profile photo, bio, and personal details, and is actively contacting my network under false pretenses.

4. ACTION REQUESTED:
Promptly terminate the fake account in accordance with your anti-cloning and authenticity guidelines.

Sincerely,
[Your Full Name]
Contact Email: [Your Email Address]
Case ID: [Generated Case ID]"""
    },

    "search_deindex": {
        "title": "Search Engine De-Indexing & Right-to-be-Forgotten Notice",
        "category": "Search Index Removal",
        "content": """To: [Search Engine Privacy Legal Support]
Date: [Current Date]
Subject: Request for Search Result De-Indexing (Personal Privacy & Right to Privacy)

Dear Search Privacy Team,

I am submitting this formal request to remove specific search result listings returned for queries of my personal name.

1. SEARCH QUERY TERMS:
Search Query: "[Your Full Legal Name]"

2. OFFENDING SEARCH RESULT URL(S):
Host Webpage URL: [Insert Third-Party Webpage Hosting the Content]
Search Result Snippet: [Insert Text snippet shown in search results]

3. NATURE OF THE VIOLATION:
The webpage linked above displays non-consensual personal information / manipulated imagery / doxxed private details.
Under your search engine's personal privacy removal policies and applicable data protection regulations (such as GDPR Art 17 / California Privacy Rights Act):
- The content consists of sensitive personal data published without consent.
- The public interest does not justify indexing this private matter.

4. ACKNOWLEDGMENT AND REQUEST:
I recognize that de-indexing this URL removes it from your search results, though it may remain hosted on the third-party web server.
I request that you de-list this result from name-based search queries across all global domains.

Sincerely,
[Your Full Legal Name]
Contact Email: [Your Email Address]
Case ID: [Generated Case ID]"""
    },

    "independent_host": {
        "title": "Independent Web Host / Domain Registrar Abuse Notice",
        "category": "Web Hosting & DMCA / Privacy Notice",
        "content": """To: [Hosting Provider / Registrar Abuse Desk - abuse@hostingprovider.com]
Date: [Current Date]
Subject: Formal Privacy Violation and Takedown Demand Notice

Dear Abuse Department / Legal Counsel,

I am writing to notify you that your network infrastructure is currently hosting infringing content that violates my fundamental privacy rights and terms of acceptable network use.

1. INFRINGING RESOURCE:
Target URL: [Insert Full Webpage URL]
IP Address / Host (if known): [Insert Host IP or CDN details]
Domain Name: [Insert Offending Domain]

2. NATURE OF PRIVACY INFRINGEMENT:
The webpage hosted on your servers displays:
[Select: Unauthorized Personal Imagery / AI Face-swap / Doxxed Private Information / Defamatory Misrepresentation]
depicting myself, published entirely without my consent.

3. NOTICE TO WEB HOST:
As the hosting provider, you maintain control over the storage and transmission of this material. Continued hosting of non-consensual private information or intimate media after receipt of formal notice may establish contributory liability under applicable privacy and communications statutes.

4. DEMANDED ACTION:
a) Immediately notify the site administrator and disable access to the offending URL.
b) Confirm in writing when access to the material has been terminated.
c) Provide the contact details of the site registrant if further legal service is required.

Notice provided in good faith by:
[Your Full Legal Name]
Contact Address: [Your City/State or Postal Address]
Contact Email: [Your Email Address]
Case Reference: [Generated Case ID]"""
    }
}

def get_template(template_key: str) -> Dict[str, Any]:
    return TEMPLATES.get(template_key, TEMPLATES["unauthorized_photo"])

def get_all_templates() -> Dict[str, Any]:
    return TEMPLATES
