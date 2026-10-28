from sqlalchemy.orm import Session

from db import engine
from models import Student

with Session(engine) as session:
    student = session.get(Student, 3)
    if student is not None:
        session.delete(student)
        session.commit()
