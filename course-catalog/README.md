# Course Catalog

A small course catalog built for the Advanced Web Technologies course. Lab 5 connects the Next.js frontend to the FastAPI backend.

Lab 2 adds shadcn/ui course cards, Tailwind styling, card hover states, and a responsive one-, two-, or three-column catalog grid.
The optional theme task is also complete: the interface uses a custom `index` accent defined through Tailwind's `@theme` block.
Two more bonus tasks add automatic system dark mode and a custom shadcn/ui `index` button variant.

## Routes

- `/` — home page
- `/about` — project information
- `/courses` — course list
- `/courses/[id]` — course details and interactive like button
- `/filter` — browser-side SWR elective filter

## Development

Start the backend first, then the frontend:

```bash
nix develop
cd course-catalog-api
source .venv/bin/activate
fastapi dev main.py
# in a second terminal:
cd course-catalog
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Create `.env.local` in this folder (it is ignored by Git):

```text
API_URL=http://localhost:8000
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Bonus decisions

The rewrite `/api/:path*` forwards the browser filter through Next.js, while the like and enrollment demonstrate direct CORS requests. `lib/schema.d.ts` contains the OpenAPI `components.schemas` contract and `Course` is derived from it. Explicit CORS method/header lists reduce accidental exposure; the environment variable supports a second local origin when needed. `cache: "no-store"` keeps the catalog and likes current, so the build does not freeze API data.

## Breakage journal

1. Removed CORS middleware: Console reported “No 'Access-Control-Allow-Origin' header”; Network showed a red CORS error for `/courses`, while the backend still returned 200. Cause: no CORS response headers; Server Component requests were unaffected.
2. Added a trailing slash to the origin: the preflight returned 400 (`Disallowed CORS origin`). Cause: an origin is `scheme://host:port` without a trailing slash.
3. Allowed only `GET`: `OPTIONS /enrollments` returned 400 (`Disallowed CORS method`) and the POST was not sent. Cause: the preflight requested POST.
4. Opened the frontend at `127.0.0.1:3000`: the browser reported no allowed origin and Network showed CORS error, although the server returned 200. Cause: localhost and 127.0.0.1 are different origins.
5. Changed `p["offset"]` to `p["ofset"]`: `/courses` returned 500 with a Python `KeyError`, and the browser showed a misleading CORS error. Cause: the exception response was produced outside the CORS middleware.

The working code restores the correct origin, POST preflight, and pagination key. The like request is a simple POST and does not require preflight; enrollment sends JSON with `Content-Type`, so the browser preflights it.

## Checks

```bash
npm run lint
npm run build
```
