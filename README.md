# Advanced Web Technology

Coursework workspace containing the Course Catalog application, its API and
database exercises, and the GitHub Explorer lab. The components remain in
separate directories so each lab can be developed and checked independently.

## Components

| Path | Purpose | Guide |
|---|---|---|
| `course-catalog/` | Next.js frontend | [Frontend guide](course-catalog/GUIDE.md) |
| `course-catalog-api/` | FastAPI, SQLAlchemy, and Alembic backend | [API guide](course-catalog-api/GUIDE.md) |
| `course-catalog-db/` | PostgreSQL schema and SQL exercises | [Database guide](course-catalog-db/GUIDE.md) |
| `github-explorer/` | Standalone HTML, CSS, and JavaScript lab | [Open source](github-explorer/) |
| `assignments/` | Course specifications and submitted lab documents | — |

The Course Catalog flow is browser → Next.js → FastAPI → PostgreSQL. The
database lab remains separate so schema, SQL, and migration experiments can be
run without changing the application database.

## Development environment

From this directory, enter the pinned Nix development shell:

```sh
nix develop
```

Use the component guides for setup, local database creation, migrations, seed
data, and app-specific checks. The root `justfile` provides workspace checks
and starts the frontend:

```sh
just run
just check
just format
```

Run component-specific commands from their own directories.

Keep local credentials in ignored `.env` files. The sample credentials are
only for an isolated teaching database; never reuse them for a shared or
production database.
