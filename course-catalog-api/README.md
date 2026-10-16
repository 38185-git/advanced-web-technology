# Course Catalog API

A small FastAPI backend for the course catalog.

## What changed in Lab 5

- CORS allows `http://localhost:3000` by default. `CORS_ORIGINS` can contain a comma-separated list of origins; the list is explicit (`GET`, `POST`, and `Content-Type`).
- Course and enrollment JSON uses camelCase (`isElective`, `courseId`, `studentName`) while Python keeps snake_case.
- `POST /courses/{course_id}/like` increments and returns a course; `POST /enrollments` creates an enrollment with status 201; `GET /enrollments` lists the in-memory records.

Examples: `POST /courses/web-security/like` returns the updated course; `POST /enrollments` with `{"courseId":"web-security","studentName":"Aigerim"}` returns `{"courseId":"web-security","studentName":"Aigerim","id":1}`.

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
- `POST /courses/nope/like` returns 404, an unknown enrollment course returns 404, and a one-character student name returns 422.
