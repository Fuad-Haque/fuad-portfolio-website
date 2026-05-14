import asyncio
from app.database import AsyncSessionLocal
from app.models import Project

projects = [
    Project(
        title="URL Shortener API",
        description="Production-grade link management service with JWT auth, custom aliases, link expiry, and click tracking. Every redirect is timestamped. Every link belongs to exactly one user.",
        tech_stack="FastAPI, PostgreSQL, SQLAlchemy, JWT, Pydantic, Railway",
        live_url="https://web-production-5bd50.up.railway.app",
        docs_url="https://web-production-5bd50.up.railway.app/docs",
        github_url="https://github.com/Fuad-Haque/url-shortener-api",
        endpoints='["POST /shorten", "GET /{short_code}", "GET /stats/{short_code}", "GET /my-links", "DELETE /links/{short_code}"]',
        order=1,
        featured=True,
    ),
    Project(
        title="Webhook Inspector",
        description="Real-time webhook debugging platform with HMAC signature verification, WebSocket live event feed, and replay engine. Self-hosted alternative to webhook.site.",
        tech_stack="FastAPI, PostgreSQL, WebSocket, HMAC-SHA256, Next.js, TypeScript, Railway, Vercel",
        live_url="https://webhook-inspector-frontend.vercel.app",
        docs_url="https://webhook-handler-production-99e2.up.railway.app/docs",
        github_url="https://github.com/Fuad-Haque/webhook-handler",
        endpoints='["POST /endpoints", "ANY /endpoints/{id}/receive", "GET /events/{id}", "POST /events/{id}/replay", "WS /ws"]',
        order=2,
        featured=True,
    ),
    Project(
        title="Task Automation API",
        description="Async background task processing service with JWT auth. Submit long-running jobs and poll progress in real time. Tasks move through queued to processing to complete or failed lifecycle.",
        tech_stack="FastAPI, Python, JWT, Pydantic, BackgroundTasks, Render",
        live_url="https://task-automation-api-i90w.onrender.com",
        docs_url="https://task-automation-api-i90w.onrender.com/docs",
        github_url="https://github.com/Fuad-Haque/task-automation-api",
        endpoints='["POST /tasks/send-report", "POST /tasks/process-data", "POST /tasks/sync-integration", "GET /tasks/{task_id}", "GET /stats"]',
        order=3,
        featured=True,
    ),
    Project(
        title="Semantic Search Platform",
        description="Production-grade document search engine with hybrid search — dense vector embeddings + BM25 keyword matching + RRF re-ranking. Three result sets rendered side-by-side.",
        tech_stack="FastAPI, Qdrant, Sentence-Transformers, PostgreSQL, SSE, Next.js, TypeScript, Railway, Vercel",
        live_url="https://semantic-search-frontend-j6yp.vercel.app/search",
        docs_url=None,
        github_url="https://github.com/Fuad-Haque/semantic-search-backend",
        endpoints='["POST /documents/upload", "GET /documents/", "GET /search/", "DELETE /documents/{id}", "GET /health"]',
        order=4,
        featured=True,
    ),
]

async def seed():
    async with AsyncSessionLocal() as session:
        for project in projects:
            session.add(project)
        await session.commit()
        print("4 projects seeded successfully")

if __name__ == "__main__":
    asyncio.run(seed())