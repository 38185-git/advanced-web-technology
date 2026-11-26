from sqlalchemy import update
from sqlalchemy.orm import Session

from db import engine
from models import Course

course_id = "api-design"

with Session(engine) as session:
    original = session.get(Course, course_id).likes

try:
    # Deliberately reproduce the lost-update pattern from the lab.
    with Session(engine) as alice, Session(engine) as bob:
        a = alice.get(Course, course_id)
        b = bob.get(Course, course_id)
        print("naive reads", a.likes, "|", b.likes)
        a.likes += 1
        alice.commit()
        b.likes += 1
        bob.commit()

    with Session(engine) as session:
        print("naive result:", session.get(Course, course_id).likes)

    with Session(engine) as session:
        session.execute(update(Course).where(Course.id == course_id).values(likes=original))
        session.commit()

    # Both assignments compile to database-side likes = likes + 1.
    with Session(engine) as alice, Session(engine) as bob:
        a = alice.get(Course, course_id)
        b = bob.get(Course, course_id)
        print("atomic reads", a.likes, "|", b.likes)
        a.likes = Course.likes + 1
        alice.commit()
        b.likes = Course.likes + 1
        bob.commit()

    with Session(engine) as session:
        print("atomic result:", session.get(Course, course_id).likes)
finally:
    # Leave the training database as it was before this experiment.
    with Session(engine) as session:
        session.execute(update(Course).where(Course.id == course_id).values(likes=original))
        session.commit()
