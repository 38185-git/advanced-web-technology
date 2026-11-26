"""Passwords and signed tokens, independent of HTTP."""
from datetime import datetime, timedelta, timezone

import jwt
from pwdlib import PasswordHash

from config import settings

ALGORITHM = "HS256"
ISSUER = "course-catalog-api"
password_hash = PasswordHash.recommended()
DUMMY_HASH = password_hash.hash("not-a-real-password")


def create_access_token(user_id: int) -> str:
    now = datetime.now(timezone.utc)
    return jwt.encode({
        "sub": str(user_id), "iss": ISSUER, "iat": now,
        "exp": now + timedelta(minutes=settings.access_token_minutes),
    }, settings.secret_key, algorithm=ALGORITHM)


def read_access_token(token: str) -> int:
    claims = jwt.decode(
        token, settings.secret_key, algorithms=[ALGORITHM], issuer=ISSUER,
        options={"require": ["exp", "sub", "iss"]},
    )
    try:
        user_id = int(claims["sub"])
        if not 0 < user_id <= 9223372036854775807:
            raise ValueError
        return user_id
    except ValueError:
        raise jwt.InvalidTokenError("sub is not a user id") from None
