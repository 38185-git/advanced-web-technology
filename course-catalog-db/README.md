# Course Catalog Database

SQL-часть проекта для Lab 6–8.

## Файлы

- schema.sql — таблицы и ограничения.
- seed.sql — начальные данные.
- queries.sql — примеры запросов для API.
- experiments/ — эксперименты с индексами и нормализацией.
- lab-6-er-diagram.md — связи между таблицами.

## Таблицы

- courses — курсы.
- students — студенты.
- enrollments — записи студентов на курсы.

Один студент может выбрать несколько курсов. Таблица enrollments связывает студентов и курсы.

## Запуск

~~~bash
psql -h localhost -U catalog_app -d course_catalog
~~~

Внутри psql:

~~~sql
\\i schema.sql
\\i seed.sql
\\i queries.sql
~~~

После seed.sql должно быть 6 курсов, 3 студента и 6 записей.
