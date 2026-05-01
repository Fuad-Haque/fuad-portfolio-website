from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel
from typing import Optional
from app.database import get_db
from app.models.project import Project
from app.services.auth import get_current_admin

router = APIRouter()

class ProjectCreate(BaseModel):
    title: str
    description: str
    tech_stack: str
    live_url: Optional[str] = None
    docs_url: Optional[str] = None
    github_url: Optional[str] = None
    endpoints: Optional[str] = None
    order: int = 0
    featured: bool = True

class ProjectOut(ProjectCreate):
    id: int
    class Config:
        from_attributes = True

@router.get("/projects", response_model=list[ProjectOut])
async def get_projects(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Project).order_by(Project.order))
    return result.scalars().all()

@router.post("/projects", response_model=ProjectOut)
async def create_project(data: ProjectCreate, db: AsyncSession = Depends(get_db), _=Depends(get_current_admin)):
    project = Project(**data.model_dump())
    db.add(project)
    await db.commit()
    await db.refresh(project)
    return project

@router.put("/projects/{id}", response_model=ProjectOut)
async def update_project(id: int, data: ProjectCreate, db: AsyncSession = Depends(get_db), _=Depends(get_current_admin)):
    result = await db.execute(select(Project).where(Project.id == id))
    project = result.scalar_one_or_none()
    if not project:
        raise HTTPException(status_code=404, detail="Not found")
    for k, v in data.model_dump().items():
        setattr(project, k, v)
    await db.commit()
    await db.refresh(project)
    return project

@router.delete("/projects/{id}")
async def delete_project(id: int, db: AsyncSession = Depends(get_db), _=Depends(get_current_admin)):
    result = await db.execute(select(Project).where(Project.id == id))
    project = result.scalar_one_or_none()
    if not project:
        raise HTTPException(status_code=404, detail="Not found")
    await db.delete(project)
    await db.commit()
    return {"deleted": True}