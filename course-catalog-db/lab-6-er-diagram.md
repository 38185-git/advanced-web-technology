# Lab 6 — Course Catalog Database Relationships

| Table | Relationship | Table | Explanation |
|---|---|---|---|
| `courses` | One-to-many | `enrollments` | One course can have many enrollment records. |
| `students` | One-to-many | `enrollments` | One student can have many enrollment records. |
| `students` | Many-to-many | `courses` | A student can choose many courses, and a course can have many students. |
| `enrollments.course_id` | Foreign key | `courses.id` | Connects an enrollment to a course. |
| `enrollments.student_id` | Foreign key | `students.id` | Connects an enrollment to a student. |

## Table Structure

| Table | Columns |
|---|---|
| `courses` | `id` PK, `title`, `description`, `credits`, `is_elective`, `likes` |
| `students` | `id` PK, `name`, `email` UK |
| `enrollments` | `id` PK, `course_id` FK, `student_id` FK, `enrolled_at` |

## Explanation

The `enrollments` table connects students and courses. It stores which student is registered for which course.
