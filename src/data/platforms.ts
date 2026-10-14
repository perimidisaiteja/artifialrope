import { PlatformInfo } from '@/types';

export const PLATFORMS_DATA: PlatformInfo[] = [
  {
    id: "instagram",
    name: "Instagram",
    category: "Social Media",
    verified_reporting_url: "https://help.instagram.com/contact/383679321740945",
    impersonation_url: "https://help.instagram.com/contact/636276399721841",
    ncii_partner: "StopNCII.org",
    last_verified_at: "2025-01-15",
    verification_status: "Verified Official",
    supported_categories: [
      "unauthorized_photo",
      "impersonation",
      "deepfake_misuse",
      "ncii",
      "harassment"
    ],
    escalation_route: "Meta Oversight Board (for eligible content decisions) / Global Privacy Contact",
    steps: [
      "Tap the '...' (three dots) above the post or profile.",
      "Select 'Report' and choose the reason (e.g., 'Bullying or harassment' or 'Pretending to be someone else').",
      "If the content depicts intimate imagery or copyright violation, use the dedicated web forms above.",
      "Preserve case confirmation email and submission reference number."
    ]
  },
  {
    id: "facebook",
    name: "Facebook",
    category: "Social Media",
    verified_reporting_url: "https://www.facebook.com/help/contact/144059062391499",
    impersonation_url: "https://www.facebook.com/help/contact/295309487309948",
    ncii_partner: "StopNCII.org",
    last_verified_at: "2025-01-15",
    verification_status: "Verified Official",
    supported_categories: [
      "unauthorized_photo",
      "impersonation",
      "deepfake_misuse",
      "ncii",
      "harassment"
    ],
    escalation_route: "Meta Financial & Privacy Rights Appeal / Oversight Board",
    steps: [
      "Click the three dots at the top right of the post or profile.",
      "Select 'Find support or report post'.",
      "Select the violation category.",
      "Submit and save the reference number."
    ]
  },
  {
    id: "tiktok",
    name: "TikTok",
    category: "Short Video",
    verified_reporting_url: "https://www.tiktok.com/legal/report/privacy",
    impersonation_url: "https://www.tiktok.com/legal/report/feedback",
    ncii_partner: "Take It Down / StopNCII",
    last_verified_at: "2025-01-20",
    verification_status: "Verified Official",
    supported_categories: [
      "unauthorized_photo",
      "impersonation",
      "deepfake_misuse",
      "ncii",
      "doxxing"
    ],
    escalation_route: "TikTok Privacy Team Direct Notice (privacy@tiktok.com)",
    steps: [
      "Long-press or click the Share arrow on the video.",
      "Tap 'Report' and select 'Privacy Violation' or 'Frauds & Scams'.",
      "For impersonation accounts, open the profile -> Share -> Report -> Report Account.",
      "For persistent unaddressed privacy violations, submit the official web form."
    ]
  },
  {
    id: "youtube",
    name: "YouTube",
    category: "Video Platform",
    verified_reporting_url: "https://support.google.com/youtube/answer/142443",
    privacy_complaint_url: "https://support.google.com/youtube/contact/privacy_complaint",
    last_verified_at: "2025-02-01",
    verification_status: "Verified Official",
    supported_categories: [
      "unauthorized_photo",
      "impersonation",
      "deepfake_misuse",
      "doxxing",
      "harassment"
    ],
    escalation_route: "Google Legal Removals / YouTube Privacy Process 48-Hour Removal Notice",
    steps: [
      "Click the three dots below the video player -> 'Report' -> 'Infringes my rights' -> 'Privacy issue'.",
      "Alternatively submit the Privacy Complaint Process form which gives the uploader 48 hours to edit or remove before YouTube staff reviews.",
      "Provide precise timestamps where your face, full name, or private information appears."
    ]
  },
  {
    id: "x",
    name: "X (formerly Twitter)",
    category: "Social Media",
    verified_reporting_url: "https://help.x.com/forms/safety-and-sensitive-content/private-information",
    impersonation_url: "https://help.x.com/forms/impersonation",
    last_verified_at: "2025-01-10",
    verification_status: "Verified Official",
    supported_categories: [
      "unauthorized_photo",
      "impersonation",
      "deepfake_misuse",
      "ncii",
      "doxxing"
    ],
    escalation_route: "X Safety Review / Legal Process Request",
    steps: [
      "Click the three dots on the post or profile.",
      "Select 'Report post' -> 'Privacy' -> 'Sharing private information or intimate media'.",
      "Complete the webform with direct links to the violating post."
    ]
  },
  {
    "id": "reddit",
    name: "Reddit",
    category: "Discussion Community",
    verified_reporting_url: "https://www.reddit.com/report",
    last_verified_at: "2025-01-18",
    verification_status: "Verified Official",
    supported_categories: [
      "unauthorized_photo",
      "impersonation",
      "deepfake_misuse",
      "ncii",
      "doxxing"
    ],
    escalation_route: "Reddit Legal Team (legal@reddit.com) / Subreddit Modmail",
    steps: [
      "Visit reddit.com/report and select 'I want to report other issues' -> 'It shares personal and confidential information' or 'Non-consensual intimate media'.",
      "Paste the direct permalink of the Reddit submission or comment.",
      "Note the case ticket sent to your email."
    ]
  },
  {
    id: "google_search",
    name: "Google Search De-indexing",
    category: "Search Engine",
    verified_reporting_url: "https://support.google.com/websearch/troubleshooter/3111061",
    last_verified_at: "2025-02-05",
    verification_status: "Verified Official",
    supported_categories: [
      "doxxing",
      "ncii",
      "unauthorized_photo",
      "deepfake_misuse",
      "sensitive_documents"
    ],
    escalation_route: "Google Removal under GDPR/CCPA / 'Results about you' dashboard",
    steps: [
      "Open Google's Removal Request Troubleshooter.",
      "Select 'Personal information, like phone numbers, addresses, government IDs' or 'Non-consensual explicit or synthetic imagery'.",
      "Provide the URL of the webpage hosting the content and the Google search result URL.",
      "Google removes the URL from search indexes (note: this does not remove it from the host server)."
    ]
  },
  {
    id: "bing_search",
    name: "Microsoft Bing De-indexing",
    category: "Search Engine",
    verified_reporting_url: "https://www.microsoft.com/concern/bing",
    last_verified_at: "2025-01-25",
    verification_status: "Verified Official",
    supported_categories: [
      "doxxing",
      "ncii",
      "unauthorized_photo",
      "deepfake_misuse"
    ],
    escalation_route: "Microsoft Privacy Response Center",
    steps: [
      "Visit the Microsoft Report a Concern page.",
      "Select 'A search result in Bing' -> 'I have a privacy issue'.",
      "Submit the offending Bing search link and query terms."
    ]
  },
  {
    id: "independent_website",
    name: "Independent Website / Web Host",
    category: "Web Hosting & Domain",
    verified_reporting_url: "https://whois.domaintools.com/",
    last_verified_at: "2025-02-01",
    verification_status: "WHOIS & Abuse Contact Protocol",
    supported_categories: [
      "unauthorized_photo",
      "impersonation",
      "deepfake_misuse",
      "ncii",
      "doxxing",
      "sensitive_documents"
    ],
    escalation_route: "Host Abuse Desk (e.g., Cloudflare abuse, AWS trust & safety, Namecheap abuse) -> Domain Registrar",
    steps: [
      "Perform a WHOIS lookup or inspect HTTP headers to identify the web hosting provider or CDN (e.g., Cloudflare, DigitalOcean, AWS).",
      "Send a formal Cease-and-Desist / Privacy Violation notice to abuse@domain.com or host abuse desk.",
      "If hosting provider is unresponsive, contact the domain registrar abuse department."
    ]
  }
];
