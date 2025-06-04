from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from todo.api import router as todo_router
from db.init_db import init_db

app = FastAPI(title="TODO API")
# Add CORS middleware before including routers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or specify allowed origins like ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

app.include_router(todo_router, prefix="/todos", tags=["Todos"])
