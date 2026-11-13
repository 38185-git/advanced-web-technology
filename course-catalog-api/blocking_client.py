import asyncio
import time

import httpx

BASE = "http://localhost:8001"


async def timed(label, make_request):
    async with httpx.AsyncClient(base_url=BASE, timeout=30) as client:
        started = time.perf_counter()
        await asyncio.gather(*(make_request(client) for _ in range(4)))
        print(f"{label:<38} {time.perf_counter() - started:.2f} s")


def graphql(field: str):
    async def request(client: httpx.AsyncClient):
        await client.post("/graphql", json={"query": "{ " + field + " }"})

    return request


async def main():
    print('4 requests at once, the database "thinks" 0.5 s in each')
    await timed("REST, def route", lambda client: client.get("/rest-slow"))
    await timed("GraphQL, sync resolver", graphql("slowSync"))
    await timed("GraphQL, async + run_in_threadpool", graphql("slowThreadpool"))


asyncio.run(main())
