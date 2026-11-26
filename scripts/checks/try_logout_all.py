"""Bonus 3: revoke every existing token by increasing token_version."""
from fastapi.testclient import TestClient
from sqlalchemy import select

from db import SessionLocal
from main import app
from models import User
from security import create_access_token

with SessionLocal() as db:
    user = db.scalar(select(User).where(User.email == "aigerim@example.com"))
    original_version = user.token_version
    token = create_access_token(user.id, original_version)

headers = {"Authorization": f"Bearer {token}"}
try:
    with TestClient(app) as client:
        before = client.get("/me", headers=headers)
        logout = client.post("/auth/logout-all", headers=headers)
        after = client.get("/me", headers=headers)
        login = client.post(
            "/auth/login",
            data={"username": "aigerim@example.com", "password": "aigerim-demo-pass"},
        )
        new_token = login.json()["access_token"]
        fresh = client.get("/me", headers={"Authorization": f"Bearer {new_token}"})

    checks = [
        ("old token initially works", before.status_code == 200),
        ("logout-all succeeds", logout.status_code == 204),
        ("old token is revoked", after.status_code == 401),
        ("new token works", fresh.status_code == 200),
    ]
    for title, ok in checks:
        print(f"{'ok  ' if ok else 'FAIL'} {title}")
    print(f"{sum(ok for _, ok in checks)} of {len(checks)} as expected")
    raise SystemExit(not all(ok for _, ok in checks))
finally:
    with SessionLocal() as db:
        user = db.scalar(select(User).where(User.email == "aigerim@example.com"))
        user.token_version = original_version
        db.commit()
