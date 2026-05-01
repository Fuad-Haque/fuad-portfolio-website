from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    database_url: str
    secret_key: str
    resend_api_key: str = ""
    resend_from_email: str = "hello@fuadhaque.com"
    resend_to_email: str = "fuadhaque.dev@gmail.com"
    admin_email: str
    admin_password: str
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60 * 24

    class Config:
        env_file = ".env"

@lru_cache
def get_settings():
    return Settings()