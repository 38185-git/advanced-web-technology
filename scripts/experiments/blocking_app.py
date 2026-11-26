from typing import Annotated

import strawberry
from fastapi import Depends, FastAPI
from sqlalchemy import text
from sqlalchemy.orm import Session
from starlette.concurrency import run_in_threadpool
from strawberry.fastapi import BaseContext, GraphQLRouter
from strawberry.types import Info

from db import get_db

app = FastAPI()


def pause(db: Session) -> int:
    db.execute(text("SELECT pg_sleep(0.5)"))
    return 1


class Context(BaseContext):
    def __init__(self, db: Session):
        super().__init__()
        self.db = db


def get_context(db: Annotated[Session, Depends(get_db)]) -> Context:
    return Context(db)


@strawberry.type
class Query:
    @strawberry.field
    def slow_sync(self, info: Info) -> int:
        return pause(info.context.db)

    @strawberry.field
    async def slow_threadpool(self, info: Info) -> int:
        return await run_in_threadpool(pause, info.context.db)


@app.get("/rest-slow")
def rest_slow(db: Annotated[Session, Depends(get_db)]):
    return {"v": pause(db)}


app.include_router(
    GraphQLRouter(
        strawberry.Schema(query=Query),
        context_getter=get_context,
    ),
    prefix="/graphql",
)
