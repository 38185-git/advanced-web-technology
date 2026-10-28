from sqlalchemy import event, select
from sqlalchemy.orm import Session, selectinload

from db import engine
from models import Course

# Open the first connection before counting application queries.
with engine.connect():
    pass

queries: list[str] = []


@event.listens_for(engine, "before_cursor_execute")
def count_query(conn, cursor, statement, parameters, context, executemany):
    queries.append(statement)


def count_enrollments(*options):
    queries.clear()
    with Session(engine) as session:
        courses = session.scalars(select(Course).options(*options)).all()
        total = sum(len(course.enrollments) for course in courses)
    return total, len(queries)


for name, options in (("lazy", []), ("selectinload", [selectinload(Course.enrollments)])):
    total, query_count = count_enrollments(*options)
    print(f"{name:13} enrollments: {total}, queries: {query_count}")
