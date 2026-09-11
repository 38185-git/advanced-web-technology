# Course Catalog

Course Catalog is a lab project for the **Advanced Web Technologies** course. It is built with Next.js 16, React 19, TypeScript, Tailwind CSS, and the App Router.

## Implemented features

- Home, About, Courses, and dynamic Course Details routes
- Server Components for pages and course cards
- Client Component with local state for course likes
- Mock asynchronous course data
- `generateStaticParams` for course pages
- Loading and not-found interfaces
- Shared navigation and responsive Tailwind styling

## Project location

The Next.js application is in the [`course-catalog`](./course-catalog) directory.

## Run locally on NixOS

```bash
git clone https://github.com/yabildos/course-catalog.git
cd course-catalog
nix develop
cd course-catalog
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verify

From the application directory:

```bash
npm run lint
npm run build
```

## Routes

| Route | Description |
| --- | --- |
| `/` | Home page |
| `/about` | Information about the project |
| `/courses` | Course list |
| `/courses/[id]` | Course details and like button |
