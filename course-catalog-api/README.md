# Course Catalog API

A small FastAPI backend for the course catalog.

## Run

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
fastapi dev main.py
```

Open http://127.0.0.1:8000/docs.

## What was verified

- `GET /` returns the running message.
- `GET /courses` returns all 6 courses sorted by popularity.
- `GET /courses/web-security` returns the Web Security course.
- `GET /courses/nope` returns `404` with `Course not found`.
- `GET /courses?is_elective=true` returns 2 elective courses.
- `GET /courses?is_elective=false` returns 4 required courses.
- `GET /courses?sort=title` returns courses alphabetically.
- `GET /courses?page=2&page_size=2` returns Web Security and Backend Foundations.
