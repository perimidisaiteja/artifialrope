"""
TruthLens AI — FastAPI Inference & Orchestration Backend
Provides high-performance media forensics, privacy violation evaluations,
Guardian AI chat assistance, and platform directory services.
"""

import os
import sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import json
import ipaddress
import urllib.parse
from typing import List, Dict, Any, Optional
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx

from detector import forensics_engine
from privacy_evaluator import privacy_evaluator
from takedown_templates import get_template, get_all_templates
from guardian_bot import guardian_bot

app = FastAPI(
    title="TruthLens AI Backend",
    version="1.0.0",
    description="Digital Privacy Guardian & Deepfake Authenticity Forensics Inference API"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load platform directory
PLATFORMS_FILE = os.path.join(os.path.dirname(__file__), "platform_directory.json")
PLATFORMS_DATA = []
if os.path.exists(PLATFORMS_FILE):
    with open(PLATFORMS_FILE, "r", encoding="utf-8") as f:
        PLATFORMS_DATA = json.load(f)

# Request Models
class PrivacyAssessmentRequest(BaseModel):
    description: str
    incident_type: str
    platform: str
    has_threats: bool = False
    is_depicted: bool = True

class ChatMessage(BaseModel):
    role: str
    content: str

class GuardianChatRequest(BaseModel):
    messages: List[ChatMessage]
    context: Optional[Dict[str, Any]] = None

class GenerateLetterRequest(BaseModel):
    template_type: str
    full_name: str
    email: str
    content_url: str
    platform_name: str
    case_id: Optional[str] = None
    account_handle: Optional[str] = None
    custom_details: Optional[str] = None

class SafeUrlCheckRequest(BaseModel):
    url: str

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "TruthLens AI Forensics & Privacy Engine",
        "version": "1.0.0",
        "forensics_engine": forensics_engine.engine_version,
        "platforms_loaded": len(PLATFORMS_DATA)
    }

@app.get("/api/platforms")
def get_platforms(category: Optional[str] = None):
    if category:
        filtered = [p for p in PLATFORMS_DATA if p.get("category", "").lower() == category.lower()]
        return {"platforms": filtered}
    return {"platforms": PLATFORMS_DATA}

@app.post("/api/analyze-image")
async def analyze_image(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files are supported in this endpoint.")
    
    file_bytes = await file.read()
    if len(file_bytes) > 25 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="Image file exceeds 25MB threshold.")

    report = forensics_engine.analyze_image_bytes(file_bytes, file.filename or "unknown_image.jpg")
    return report

@app.post("/api/analyze-video")
async def analyze_video(
    file: UploadFile = File(...),
    duration: float = Form(default=10.0)
):
    if not (file.content_type.startswith("video/") or (file.filename and file.filename.endswith(('.mp4', '.mov', '.webm', '.avi')))):
        raise HTTPException(status_code=400, detail="Only video files are supported in this endpoint.")
    
    file_bytes = await file.read()
    file_size = len(file_bytes)
    if file_size > 100 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="Video file exceeds 100MB threshold.")

    report = forensics_engine.analyze_video_summary(
        filename=file.filename or "suspect_video.mp4",
        file_size=file_size,
        duration_seconds=duration
    )
    return report

@app.post("/api/privacy-assessment")
def assess_privacy(req: PrivacyAssessmentRequest):
    result = privacy_evaluator.evaluate_incident(
        description=req.description,
        incident_type=req.incident_type,
        platform=req.platform,
        has_threats=req.has_threats,
        is_depicted=req.is_depicted
    )
    return result

@app.post("/api/guardian-chat")
async def guardian_chat(req: GuardianChatRequest):
    msgs = [{"role": m.role, "content": m.content} for m in req.messages]
    response = await guardian_bot.get_response(msgs, req.context)
    return response

@app.get("/api/templates")
def list_templates():
    return {"templates": get_all_templates()}

@app.post("/api/generate-letter")
def generate_letter(req: GenerateLetterRequest):
    base_tpl = get_template(req.template_type)
    text = base_tpl["content"]
    
    import datetime
    today_str = datetime.datetime.now().strftime("%B %d, %Y")
    case_str = req.case_id or f"TL-{today_str[:3].upper()}-{abs(hash(req.content_url)) % 10000:04d}"

    text = text.replace("[Current Date]", today_str)
    text = text.replace("[Platform Trust & Safety / Support Team]", f"{req.platform_name} Trust & Safety Team")
    text = text.replace("[Platform Trust & Safety / Abuse Team]", f"{req.platform_name} Abuse & Safety Desk")
    text = text.replace("[Insert Content URL]", req.content_url)
    text = text.replace("[Insert Posting Account Name]", req.account_handle or "Reported User")
    text = text.replace("[Insert Impersonating Profile URL]", req.content_url)
    text = text.replace("[Insert Impersonating Handle]", req.account_handle or "Unknown")
    text = text.replace("[Your Full Name]", req.full_name)
    text = text.replace("[Your Full Legal Name]", req.full_name)
    text = text.replace("[Your Name / Initial]", req.full_name)
    text = text.replace("[Your Email Address]", req.email)
    text = text.replace("[Your Secure Email Address]", req.email)
    text = text.replace("[Generated Case ID]", case_str)

    if req.custom_details:
        text += f"\n\nADDITIONAL INCIDENT CONTEXT:\n{req.custom_details}"

    return {
        "title": base_tpl["title"],
        "category": base_tpl["category"],
        "case_id": case_str,
        "generated_draft": text
    }

@app.post("/api/verify-url")
async def verify_url(req: SafeUrlCheckRequest):
    """
    Safely inspects a user-submitted URL with SSRF protection.
    Blocks private IP ranges (127.0.0.1, 10.x, 192.168.x, 169.254.x, localhost).
    """
    target_url = req.url.strip()
    try:
        parsed = urllib.parse.urlparse(target_url)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid URL format.")

    if parsed.scheme not in ["http", "https"]:
        raise HTTPException(status_code=400, detail="Only HTTP/HTTPS URLs are allowed.")

    hostname = parsed.hostname
    if not hostname:
        raise HTTPException(status_code=400, detail="Invalid target hostname.")

    # Check for localhost / loopback
    if hostname.lower() in ["localhost", "127.0.0.1", "::1", "metadata.google.internal"]:
        raise HTTPException(status_code=403, detail="SSRF Safeguard: Access to internal networks is restricted.")

    try:
        ip = ipaddress.ip_address(hostname)
        if ip.is_private or ip.is_loopback or ip.is_link_local:
            raise HTTPException(status_code=403, detail="SSRF Safeguard: Access to private IP addresses is blocked.")
    except ValueError:
        pass # Domain name, not raw IP

    # Return safe inspection summary
    return {
        "url": target_url,
        "domain": hostname,
        "scheme": parsed.scheme,
        "path": parsed.path,
        "status": "URL verified as valid public target",
        "ssrf_safe": True
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
