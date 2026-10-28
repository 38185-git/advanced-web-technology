-- Queries for the API routes. Modifying examples are rolled back.

-- 1. GET /courses?is_elective=false&sort=popular&page=1&page_size=3
SELECT id, title, credits, likes FROM courses WHERE is_elective = false
ORDER BY likes DESC, id LIMIT 3 OFFSET 0;

-- 1b. Page 2
SELECT id, title, credits, likes FROM courses WHERE is_elective = false
ORDER BY likes DESC, id LIMIT 3 OFFSET 3;

-- 2. GET /courses/{course_id}
SELECT id, title, credits, is_elective, likes FROM courses WHERE id = 'api-design';

-- 2b. Unknown course: no rows, API returns 404.
SELECT id, title, credits, is_elective, likes FROM courses WHERE id = 'no-such-course';

-- 3. POST /courses/{course_id}/like
BEGIN;
UPDATE courses SET likes = likes + 1 WHERE id = 'api-design' RETURNING id, likes;
UPDATE courses SET likes = likes + 1 WHERE id = 'no-such-course' RETURNING id, likes;
ROLLBACK;

-- 4. POST /enrollments
BEGIN;
INSERT INTO enrollments (course_id, student_id) VALUES ('web-security', 3)
RETURNING id, course_id, student_id;
ROLLBACK;

-- 5. GET /enrollments
SELECT e.id, s.name AS student, c.title AS course
FROM enrollments e
JOIN students s ON s.id = e.student_id
JOIN courses c ON c.id = e.course_id
ORDER BY e.id;

-- 6. Enrollments per course, including courses with none.
SELECT c.id, count(e.id) AS enrolled
FROM courses c LEFT JOIN enrollments e ON e.course_id = c.id
GROUP BY c.id ORDER BY enrolled DESC, c.id;

-- Bonus 4, query 7: courses nobody is enrolled in.
SELECT c.id FROM courses c
LEFT JOIN enrollments e ON e.course_id = c.id
WHERE e.id IS NULL ORDER BY c.id;

-- Bonus 4, query 8: students with more than one course.
SELECT s.name, count(*) AS courses
FROM students s JOIN enrollments e ON e.student_id = s.id
GROUP BY s.id, s.name
HAVING count(*) > 1
ORDER BY courses DESC, s.name;
