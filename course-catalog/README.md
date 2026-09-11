# Course Catalog

A small course catalog built for the Advanced Web Technologies course. The project demonstrates the Next.js App Router, Server and Client Components, dynamic routes, loading and not-found UI, static parameter generation, and TypeScript props.

## Routes

- `/` — home page
- `/about` — project information
- `/courses` — course list
- `/courses/[id]` — course details and interactive like button

## Development

From the parent `advanced-web-technology` directory, enter the Nix environment:

```bash
nix develop
cd course-catalog
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm run lint
npm run build
```
