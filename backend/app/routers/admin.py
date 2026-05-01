from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi.security import OAuth2PasswordRequestForm
from app.database import get_db
from app.models.message import Message
from app.models.admin import Admin
from app.services.auth import verify_password, create_access_token, get_current_admin, hash_password
from app.config import get_settings

router = APIRouter()
settings = get_settings()

@router.post("/admin/token")
async def login(form: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Admin).where(Admin.email == form.username))
    admin = result.scalar_one_or_none()
    if not admin or not verify_password(form.password, admin.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": admin.email})
    return {"access_token": token, "token_type": "bearer"}

@router.get("/admin/messages")
async def get_messages(db: AsyncSession = Depends(get_db), _=Depends(get_current_admin)):
    result = await db.execute(select(Message).order_by(Message.created_at.desc()))
    return result.scalars().all()

@router.patch("/admin/messages/{id}/read")
async def mark_read(id: int, db: AsyncSession = Depends(get_db), _=Depends(get_current_admin)):
    result = await db.execute(select(Message).where(Message.id == id))
    msg = result.scalar_one_or_none()
    if not msg:
        raise HTTPException(status_code=404, detail="Not found")
    msg.read = True
    await db.commit()
    return {"updated": True}

@router.post("/admin/seed")
async def seed_admin(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Admin).where(Admin.email == settings.admin_email))
    if result.scalar_one_or_none():
        return {"status": "already exists"}
    admin = Admin(email=settings.admin_email, hashed_password=hash_password(settings.admin_password))
    db.add(admin)
    await db.commit()
    return {"status": "created"}