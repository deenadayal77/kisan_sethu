from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # ========== GEMINI AI CONFIGURATION ==========
    gemini_api_key: str | None = None
    gemini_model: str = "gemini-2.0-flash"

    # ========== DATABASE CONFIGURATION ==========
    database_url: str = "sqlite:///./kisansethu.db"
    db_echo: bool = False
    db_pool_size: int = 5
    db_max_overflow: int = 10

    # ========== JWT & AUTHENTICATION ==========
    jwt_secret: str = "change-this-dev-secret"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 1440  # 24 hours
    bcrypt_rounds: int = 12

    # ========== APP CONFIGURATION ==========
    app_name: str = "Kisan Sethu API"
    app_version: str = "0.1.0"
    environment: str = "development"

    # ========== CORS & SERVER CONFIGURATION ==========
    cors_origins: str = "http://localhost:3000,http://127.0.0.1:3000"
    allowed_hosts: str = "localhost,127.0.0.1,192.168.1.65"

    # ========== FILE UPLOAD CONFIGURATION ==========
    upload_dir: str = "uploads"
    max_upload_size_mb: int = 50

    # ========== API ENDPOINTS CONFIGURATION ==========
    api_prefix: str = "/api"
    api_docs_url: str = "/docs"
    api_redoc_url: str = "/redoc"

    # ========== LOGGING CONFIGURATION ==========
    log_level: str = "INFO"

    # ========== PRODUCTION SETTINGS ==========
    debug: bool = True
    workers: int = 1

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=False,
    )

    @property
    def allowed_origins(self) -> list[str]:
        return [
            origin.strip()
            for origin in self.cors_origins.split(",")
            if origin.strip()
        ]

    @property
    def allowed_hosts_list(self) -> list[str]:
        return [
            host.strip()
            for host in self.allowed_hosts.split(",")
            if host.strip()
        ]

    @property
    def max_upload_size_bytes(self) -> int:
        return self.max_upload_size_mb * 1024 * 1024


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
