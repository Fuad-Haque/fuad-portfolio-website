from fastapi import APIRouter, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel, EmailStr
from slowapi import Limiter
from slowapi.util import get_remote_address
from app.database import get_db
from app.models.message import Message
from app.services.email import send_contact_email

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    project_type: str
    budget: str
    message: str

@router.post("/contact")
@limiter.limit("5/hour")
async def contact(request: Request, data: ContactForm, db: AsyncSession = Depends(get_db)):
    msg = Message(**data.model_dump())
    db.add(msg)
    await db.commit()
    await send_contact_email(data.name, data.email, data.project_type, data.budget, data.message)
    return {"status": "sent"}