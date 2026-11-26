"""Bonus 2: replace an outdated Argon2 hash after a successful login."""
from pwdlib import PasswordHash
from pwdlib.hashers.argon2 import Argon2Hasher
from sqlalchemy import select

from auth import authenticate
from db import SessionLocal
from models import User
from security import password_hash

EMAIL = "daniyar@example.com"
PASSWORD = "daniyar-demo-pass"
weak = PasswordHash((Argon2Hasher(time_cost=1, memory_cost=1024, parallelism=1),))

with SessionLocal() as db:
    user = db.scalar(select(User).where(User.email == EMAIL))
    original = user.password_hash
    try:
        user.password_hash = weak.hash(PASSWORD)
        db.commit()
        weak_start = user.password_hash.split("$")[3]

        assert authenticate(db, EMAIL, "wrong-password") is None
        assert user.password_hash.split("$")[3] == weak_start

        assert authenticate(db, EMAIL, PASSWORD) is user
        upgraded = user.password_hash
        assert upgraded.split("$")[3] == "m=65536,t=3,p=4"
        assert password_hash.verify(PASSWORD, upgraded)

        assert authenticate(db, EMAIL, PASSWORD) is user
        assert user.password_hash == upgraded
        print(f"ok   weak parameters:     {weak_start}")
        print(f"ok   upgraded parameters: {upgraded.split('$')[3]}")
        print("3 of 3 as expected")
    finally:
        user.password_hash = original
        db.commit()
