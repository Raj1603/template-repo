from sqlmodel import SQLModel
from typing import Optional

class TodoCreate(SQLModel):
    title: str
    description: Optional[str] = None

class TodoRead(SQLModel):
    id: int
    title: str
    description: Optional[str]
    is_completed: bool

class TodoUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    is_completed: Optional[bool] = None
