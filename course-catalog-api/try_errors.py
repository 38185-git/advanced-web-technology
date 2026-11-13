import httpx

BASE = "http://localhost:8000"
CASES = [
    ("email already taken", "/students", {"name": "Aigerim Two", "email": "aigerim@example.com"}, 409, "email-taken"),
    ("already enrolled", "/enrollments", {"courseId": "ai-integration", "studentId": 3}, 409, "already-enrolled"),
    ("unknown course", "/enrollments", {"courseId": "nope", "studentId": 3}, 404, "course-not-found"),
    ("unknown student", "/enrollments", {"courseId": "web-security", "studentId": 999}, 404, "student-not-found"),
    ("name too short", "/students", {"name": "N", "email": "n@example.com"}, 422, "validation-error"),
]

failed = 0
for title, path, body, expected, slug in CASES:
    response = httpx.post(BASE + path, json=body)
    kind = response.json().get("type", "-").rsplit("/", 1)[-1]
    ok = response.status_code == expected and (slug is None or kind == slug)
    failed += not ok
    mark = "ok  " if ok else "FAIL"
    print(f"{mark} {title:<20} {response.status_code}  {response.headers['content-type']:<25} {kind}")
print(f"{len(CASES) - failed} of {len(CASES)} as expected")
