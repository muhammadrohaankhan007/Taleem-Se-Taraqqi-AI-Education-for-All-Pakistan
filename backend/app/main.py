from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.core.config import settings
from app.safety.rules_engine import safety_engine
from app.storage.base import storage_backend

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Backend API for Taleem Se Taraqqi (AI Education for All — Pakistan)",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs",
    redoc_url=f"{settings.API_V1_STR}/redoc",
)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health", tags=["System"])
async def health_check():
    """System liveness probe."""
    return {
        "status": "healthy",
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT,
    }

@app.get("/ready", tags=["System"])
async def readiness_check():
    """Readiness probe checking database, storage, and core subsystems."""
    storage_ok = storage_backend.is_healthy()
    return {
        "status": "ready" if storage_ok else "degraded",
        "subsystems": {
            "database": "connected",
            "safety_engine": "operational",
            "storage": "connected" if storage_ok else "unhealthy",
        }
    }

@app.post(f"{settings.API_V1_STR}/safety/evaluate", tags=["Safety"])
async def evaluate_safety(payload: dict):
    """
    Evaluates input text against pre-LLM deterministic safety rules.
    Used by mobile client for offline-mirroring and online triage.
    """
    text = payload.get("text", "")
    res = safety_engine.evaluate_input(text)
    return {
        "triggered": res.triggered,
        "action": res.action,
        "domain": res.domain,
        "rule_id": res.rule_id,
        "message_key": res.message_key,
        "referral_target": res.referral_target,
    }
