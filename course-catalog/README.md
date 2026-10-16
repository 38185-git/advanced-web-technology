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

## Bonus tasks

1. Rewrites: `/api/:path*` forwards the browser filter through Next.js. The filter requests `/api/courses?is_elective=true`; the like and enrollment keep direct API URLs to demonstrate CORS and preflight.
2. OpenAPI types: `lib/schema.d.ts` contains the `components.schemas` contract produced from the backend OpenAPI schema; `Course` is imported from that contract instead of being duplicated.
3. Environment CORS origins: the backend reads `CORS_ORIGINS`, splits comma-separated origins, and defaults to `http://localhost:3000`. For example: `CORS_ORIGINS="http://localhost:3000,http://127.0.0.1:3000"`.
4. Frozen data experiment: after temporarily removing `cache: "no-store"`, `npm run build` and `npm run start` serve the `/courses` value captured during build, while `/courses/[id]` remains dynamic and reads the current like count. Restoring `cache: "no-store"` makes `/courses` current again.
5. Explicit CORS lists: `allow_methods=["GET", "POST"]` and `allow_headers=["Content-Type"]` keep the required requests working; an `OPTIONS` request for `DELETE` or `Authorization` receives 400, preventing methods and headers that the app does not need.

The rewrite bonus was checked with the browser filter and the explicit CORS bonus with preflight requests. The working submission keeps CORS enabled because the required like and enrollment checks must remain demonstrable.

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
