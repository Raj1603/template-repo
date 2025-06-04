from sqlmodel import create_engine, Session
import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@db:5432/tododb")  # fallback for local

engine = create_engine(DATABASE_URL, echo=True)

def get_db():
    with Session(engine) as session:
        yield session
