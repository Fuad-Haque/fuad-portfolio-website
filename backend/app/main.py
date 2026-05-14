from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from app.routers import health, projects, contact, admin
from app.database import engine, Base
from app.models import Project

limiter = Limiter(key_func=get_remote_address)

app = FastAPI(title="Fuad Haque Portfolio API", version="1.0.0")

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://fuadhaque.com",
        "https://fuad-portfolio-website.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

app.include_router(health.router)
app.include_router(projects.router)
app.include_router(contact.router)
app.include_router(admin.router)