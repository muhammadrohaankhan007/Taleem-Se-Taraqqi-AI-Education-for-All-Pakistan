from typing import List, Optional
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Taleem Se Taraqqi API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    ENVIRONMENT: str = "dev"
    DATABASE_URL: str = "postgresql+asyncpg://tst_user:tst_secure_password_2026@localhost:5432/taleem_db"
    SYNC_DATABASE_URL: str = "postgresql://tst_user:tst_secure_password_2026@localhost:5432/taleem_db"
    REDIS_URL: str = "redis://localhost:6379/0"
    
    JWT_SECRET: str = "dev_jwt_secret_key_change_in_production_32char"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    REFRESH_TOKEN_EXPIRE_DAYS: int = 30
    
    STORAGE_BACKEND: str = "local"
    STORAGE_LOCAL_DIR: str = "/app/storage"

    S3_ENDPOINT: Optional[str] = "http://localhost:9000"
    S3_ACCESS_KEY: Optional[str] = "minioadmin"
    S3_SECRET_KEY: Optional[str] = "minioadmin"
    S3_BUCKET_NAME: Optional[str] = "taleem-packs"
    
    LLM_PROVIDER: str = "stub"
    OPENAI_API_KEY: Optional[str] = None
    ANTHROPIC_API_KEY: Optional[str] = None
    GEMINI_API_KEY: Optional[str] = None

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
