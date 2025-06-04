from sqlmodel import SQLModel
from todo.models import Todo  # Import all models here

def create_all_tables(engine):
    SQLModel.metadata.create_all(engine)
