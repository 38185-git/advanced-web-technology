"""Bonus 1: demonstrate a router that is authenticated by default."""
from fastapi import APIRouter, Depends
from fastapi.testclient import TestClient

from auth import get_current_user
from main import app

protected = APIRouter(dependencies=[Depends(get_current_user)])


@protected.get("/secret")
def secret():
    return {"ok": True}


app.include_router(protected)

with TestClient(app) as client:
    anonymous = client.get("/secret")
    login = client.post(
        "/auth/login",
        data={"username": "aigerim@example.com", "password": "aigerim-demo-pass"},
    )
    token = login.json()["access_token"]
    authenticated = client.get(
        "/secret",
        headers={"Authorization": f"Bearer {token}"},
    )

checks = [
    ("anonymous is rejected", anonymous.status_code == 401),
    ("challenge is Bearer", anonymous.headers.get("www-authenticate") == "Bearer"),
    ("authenticated user passes", authenticated.status_code == 200),
]
for title, ok in checks:
    print(f"{'ok  ' if ok else 'FAIL'} {title}")
print(f"{sum(ok for _, ok in checks)} of {len(checks)} as expected")
raise SystemExit(not all(ok for _, ok in checks))
