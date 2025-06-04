from typing import Union, List
from sqlmodel import Session, select
from .models import Todo
from .schemas import TodoCreate, TodoUpdate

def create_todo(todo_data: TodoCreate, db: Session) -> Todo:
    todo = Todo.from_orm(todo_data)
    db.add(todo)
    db.commit()
    db.refresh(todo)
    return todo

def get_all_todos(db: Session) -> List[Todo]:
    return db.exec(select(Todo)).all()

def delete_todo(todo_id: int, db: Session) -> bool:
    todo = db.get(Todo, todo_id)
    if todo:
        db.delete(todo)
        db.commit()
        return True
    return False

def update_todo(todo_id: int, todo_data: TodoUpdate, db: Session) -> Union[Todo, None]:
    todo = db.get(Todo, todo_id)
    if not todo:
        return None
    
    todo_data_dict = todo_data.dict(exclude_unset=True)
    for key, value in todo_data_dict.items():
        setattr(todo, key, value)
    
    db.add(todo)
    db.commit()
    db.refresh(todo)
    return todo
