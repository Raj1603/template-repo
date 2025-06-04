from .session import engine
from .base import create_all_tables

def init_db():
    create_all_tables(engine)
