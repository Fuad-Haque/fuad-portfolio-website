# Fuad Haque — Portfolio

<div align="center">

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Sora&weight=700&size=22&duration=2800&pause=1000&color=6C63FF&center=true&vCenter=true&width=700&lines=Technological+Noir+Portfolio;FastAPI+%C2%B7+Next.js+%C2%B7+PostgreSQL;GSAP+%C2%B7+Framer+Motion+%C2%B7+Custom+Cursor;Built+for+developers+who+ship+fast.)](https://git.io/typing-svg)

</div>

<div align="center">

![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## Overview

**fuadhaque.com** is a production-grade full-stack portfolio with a Technological Noir aesthetic — built to convert visitors into clients in under 90 seconds. The frontend is a Next.js 16 application with GSAP scroll animations, Framer Motion page transitions, a custom cursor, grain overlay, and ambient glow layers. The backend is a FastAPI + PostgreSQL API that powers the projects showcase, contact form, and admin panel.

**Live** → [fuadhaque.com](https://fuadhaque.com)  
**Backend API / Swagger Docs** → [api.fuadhaque.com/docs](https://api.fuadhaque.com/docs)  
**Health** → [api.fuadhaque.com/health](https://api.fuadhaque.com/health)

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Stack](#stack)
- [API Reference](#api-reference)
- [Environment Variables](#environment-variables)
- [Quick Start](#quick-start)
- [Docker](#docker)
- [Project Structure](#project-structure)
- [Error Handling](#error-handling)
- [Author](#author)

---

## Features

| Feature | Detail |
|---------|--------|
| Technological Noir Aesthetic | Grain overlay, ambient violet/teal glow, custom dot+ring cursor, film-grain texture |
| GSAP Scroll Reveals | Elements stagger into view on scroll using ScrollTrigger — all with `prefers-reduced-motion` support |
| Framer Motion Transitions | Page fade transitions via AnimatePresence — no sliding (grain layer stays fixed) |
| Terminal Boot Screen | Loading screen runs once per session — 6-line boot sequence in JetBrains Mono |
| Custom Cursor | Dot + spring-delayed ring — color shifts on card hover, hides on touch devices |
| Projects API | Full CRUD — JWT-authenticated admin, public read, ordered and featured flags |
| Contact Form | Rate-limited (5/hour), stores to PostgreSQL, sends email via Resend |
| Admin Panel | JWT login, project management, message inbox with read/unread state |
| Health Endpoint | `/health` checks database connectivity — used in footer as a technical flex |
| SEO + Metadata | OpenGraph, JSON-LD structured data, robots.txt, sitemap |

---

## Architecture

```
Browser (Next.js · Vercel)
    │
    ├── HTTP (REST) ──────────── FastAPI (Railway)
    │                                │
    │                           PostgreSQL ── Projects · Messages · Admins
    │
    └── Static + SSR ─────────── Vercel Edge Network
```

### Request Lifecycle

```
Visitor lands on fuadhaque.com
    │
    ├── Loading screen runs (sessionStorage — once per session)
    ├── Hero animates in (Framer Motion stagger)
    ├── GET /projects → FastAPI → PostgreSQL → project cards render
    ├── Contact form → POST /contact → rate check → DB insert → Resend email
    └── Admin → POST /admin/token → JWT → project CRUD + message inbox
```

---

## Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16, TypeScript, Tailwind CSS v4 |
| Animations | GSAP + ScrollTrigger, Framer Motion |
| Typography | Syne (display) · JetBrains Mono (UI) · Inter (body) |
| Backend | FastAPI, SQLAlchemy (async), asyncpg |
| Database | PostgreSQL |
| Auth | JWT (python-jose), bcrypt (passlib) |
| Email | Resend |
| Rate Limiting | slowapi |
| Deployment | Vercel (frontend) + Railway (backend) |
| API Documentation | Swagger UI — auto-generated at `/docs` |

---

## API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/health` | No | Health check — returns service and database status |
| `GET` | `/projects` | No | List all projects ordered by `order` field |
| `POST` | `/projects` | Yes | Create a new project |
| `PUT` | `/projects/{id}` | Yes | Update a project |
| `DELETE` | `/projects/{id}` | Yes | Delete a project |
| `POST` | `/contact` | No | Submit contact form — rate limited 5/hour |
| `POST` | `/admin/token` | No | Login — returns JWT access token |
| `GET` | `/admin/messages` | Yes | List all contact form submissions |
| `PATCH` | `/admin/messages/{id}/read` | Yes | Mark a message as read |
| `POST` | `/admin/seed` | No | Seed the first admin account (run once) |

### Request / Response Examples

**Get projects**
```http
GET /projects
```
```json
[
  {
    "id": 1,
    "title": "Semantic Search Platform",
    "description": "Upload docs and search by meaning...",
    "tech_stack": "FastAPI, Next.js, Qdrant, PostgreSQL",
    "live_url": "https://semantic-search-frontend-j6yp.vercel.app/search",
    "docs_url": null,
    "endpoints": "[\"POST /documents/upload\", \"GET /search/\"]",
    "order": 1,
    "featured": true
  }
]
```

**Submit contact form**
```http
POST /contact
Content-Type: application/json

{
  "name": "John Smith",
  "email": "john@company.com",
  "project_type": "Full-Stack MVP",
  "budget": "$600-1000",
  "message": "I need a FastAPI backend with a Next.js frontend..."
}
```
```json
{ "status": "sent" }
```

**Admin login**
```http
POST /admin/token
Content-Type: application/x-www-form-urlencoded

username=admin@email.com&password=yourpassword
```
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

---

## Environment Variables

### Backend (`.env`)

```env
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio
SECRET_KEY=your-jwt-secret-minimum-32-chars
RESEND_API_KEY=re_xxxx
RESEND_FROM_EMAIL=hello@fuadhaque.com
RESEND_TO_EMAIL=fuadhaque.dev@gmail.com
ADMIN_EMAIL=fuadhaque.dev@gmail.com
ADMIN_PASSWORD=your-strong-admin-password
```

### Frontend (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

A fully documented `.env.example` is included in the root.

---

## Quick Start

### Backend

```bash
git clone https://github.com/Fuad-Haque/fuad-portfolio-website
cd fuad-portfolio-website/backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your values
alembic upgrade head
python -c "import httpx; httpx.post('http://localhost:8000/admin/seed')"
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
cp .env.example .env.local
# Edit .env.local — set NEXT_PUBLIC_API_URL
npm install
npm run dev
```

Backend runs at `http://localhost:8000` — Swagger docs at `http://localhost:8000/docs`.  
Frontend runs at `http://localhost:3000`.

---

## Docker

```bash
git clone https://github.com/Fuad-Haque/fuad-portfolio-website
cd fuad-portfolio-website
cp .env.example .env
# Edit .env with your values
docker compose up
```

Services started:
- `db` — PostgreSQL on port `5432`
- `backend` — FastAPI on port `8000`
- `frontend` — Next.js on port `3000`

---

## Project Structure

```
fuad-portfolio-website/
├── backend/
│   ├── app/
│   │   ├── main.py                  # FastAPI entry point, CORS, rate limiting
│   │   ├── config.py                # Settings via pydantic-settings
│   │   ├── database.py              # Async SQLAlchemy session + Base
│   │   ├── models/
│   │   │   ├── project.py           # Project ORM model
│   │   │   ├── message.py           # Contact message ORM model
│   │   │   └── admin.py             # Admin ORM model
│   │   ├── routers/
│   │   │   ├── health.py            # GET /health
│   │   │   ├── projects.py          # Project CRUD
│   │   │   ├── contact.py           # POST /contact with rate limiting
│   │   │   └── admin.py             # JWT login + message management
│   │   └── services/
│   │       ├── auth.py              # JWT creation, bcrypt hashing
│   │       └── email.py             # Resend email service
│   ├── migrations/                  # Alembic migration files
│   ├── .env.example
│   ├── Dockerfile
│   ├── alembic.ini
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx           # Root layout — fonts, global components
│   │   │   ├── page.tsx             # Home page
│   │   │   ├── projects/page.tsx    # All projects grid
│   │   │   ├── about/page.tsx       # Terminal block + bio
│   │   │   ├── contact/page.tsx     # Contact form + services list
│   │   │   └── admin/               # Login, projects CRUD, messages inbox
│   │   ├── components/
│   │   │   ├── global/              # CustomCursor, GrainOverlay, AmbientGlow, LoadingScreen, PageTransition
│   │   │   ├── layout/              # Navbar, Footer
│   │   │   ├── home/                # HeroSection, StatsStrip, TechMarquee, FeaturedProjects, CTASection
│   │   │   ├── projects/            # ProjectCard
│   │   │   └── ui/                  # Badge, Button, TerminalBlock, GlowDivider
│   │   ├── hooks/
│   │   │   ├── useMagneticHover.ts  # Magnetic button effect
│   │   │   └── useScrollReveal.ts   # GSAP ScrollTrigger reveal
│   │   ├── lib/
│   │   │   ├── api.ts               # Axios instance + projectsApi, contactApi, adminApi
│   │   │   └── analytics.ts         # Page view + event tracking
│   │   ├── styles/
│   │   │   └── design-tokens.ts     # Color, font, motion tokens
│   │   └── types/
│   │       └── index.ts             # Project, Message, ContactForm interfaces
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## Error Handling

| Status Code | Scenario |
|-------------|----------|
| `200 OK` | Request processed successfully |
| `401 Unauthorized` | Missing or invalid JWT token |
| `404 Not Found` | Project or message ID does not exist |
| `422 Unprocessable Entity` | Request validation error (Pydantic) |
| `429 Too Many Requests` | Contact form rate limit exceeded (5/hour) |
| `500 Internal Server Error` | Database connectivity issue or unhandled error |

---

## Author

Built by [Fuad Haque](https://fuadhaque.com)

[fuadhaque.dev@gmail.com](mailto:fuadhaque.dev@gmail.com) · [Book a Call](https://cal.com/fuad-haque/30min) · [GitHub](https://github.com/Fuad-Haque)
