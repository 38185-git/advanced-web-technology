# Course Catalog API

Отчёт по Lab 9: [JWT, роли, матрица доступа, угрозы и эксперименты](LAB9_REPORT.md).

Backend для каталога курсов. Используются FastAPI, PostgreSQL, SQLAlchemy, Alembic и GraphQL.

## Запуск

~~~bash
cd course-catalog-api
source .venv/bin/activate
cp .env.example .env
alembic upgrade head
psql -h localhost -U catalog_app -d course_catalog -f seed.sql
fastapi dev main.py
~~~

API: http://localhost:8000/docs
GraphQL: http://localhost:8000/graphql

## Lab 7

- SQLAlchemy-модели для курсов, студентов и записей на курсы.
- PostgreSQL вместо списков Python.
- Alembic-миграции 0001 и 0002.
- Обработка ошибок базы данных.
- Защита от lost update при увеличении likes.

Проверки:

~~~bash
alembic check
python check_db.py
python check_models.py
python try_errors.py
python try_lost_update.py
python try_delete.py
python try_n_plus_1_orm.py
~~~

## Lab 8

- Общий слой сервисов для REST и GraphQL.
- GraphQL-запросы и мутации через Strawberry.
- userErrors для ожидаемых ошибок.
- DataLoader для решения N+1.
- Ограничение глубины запросов и количества aliases.
- Две версии страницы My Courses: REST и GraphQL.

Проверки:

~~~bash
python try_graphql.py
python try_n_plus_1.py
python try_protection.py
python measure.py
~~~

## Бонусы

Краткая карта бонусов:

- Lab 7: `bonus_examples/lab7_bonus_1_check.py` — CHECK для `level`;
  `bonus_examples/lab7_bonus_2_rename.py` — переименование `description` в `summary`;
  `try_n_plus_1_orm.py` — N+1 и `selectinload`;
  `try_lost_update.py` — lost update;
  `models.py` и `try_delete.py` — cascade/passive deletes.
- Lab 8: `problem.py` и `try_post.py` — Problem Details для validation errors;
  `services.py` и `graphql_api.py` — `createStudent` с общей бизнес-логикой;
  `blocking_app.py` и `blocking_client.py` — blocking resolver.

Полное описание и ссылки: [BONUS_TASKS.md](BONUS_TASKS.md).

## Журнал экспериментов Lab 7–8

### Миграции

- `alembic upgrade head` применяет миграции `0001` и `0002`.
- `alembic downgrade -1` удаляет `courses.level`, а повторный `alembic upgrade head` восстанавливает и заполняет его значениями `beginner`/`intermediate`.
- `alembic check` проверяет, что модели SQLAlchemy и схема базы данных не требуют дополнительной миграции.
- Для чистого запуска сначала применяются миграции, затем выполняется `seed.sql`; начальные данные содержат 6 курсов, 3 студентов и 6 записей о зачислении.

### Ошибки и ограничения

Имена ограничений из PostgreSQL используются в `services.commit`: это позволяет преобразовать `UNIQUE` и `FOREIGN KEY` ошибки в стабильные коды `EMAIL_TAKEN`, `ALREADY_ENROLLED`, `COURSE_NOT_FOUND` и `STUDENT_NOT_FOUND`. REST переводит их в Problem Details через `problem.py`, а GraphQL возвращает их в `userErrors`.

Ошибки валидации FastAPI также переводятся в Problem Details. Обработчик берёт список из `RequestValidationError.errors()` и добавляет его как расширение `errors`; это не обязательное поле RFC 9457, поэтому оно позволяет вернуть несколько ошибок одного запроса в одном формате.

### Bonus 1: CHECK для level

`bonus_examples/lab7_bonus_1_check.py` добавляет обратимое ограничение `courses_level_check` для значений `beginner`, `intermediate` и `advanced`. Оно вынесено в отдельный эксперимент, чтобы основная цепочка миграций соответствовала заданию Lab 7.

### Bonus 2: переименование description → summary

`bonus_examples/lab7_bonus_2_rename.py` содержит обратимую миграцию `alter_column`: `upgrade` переименовывает `description` в `summary`, а `downgrade` возвращает исходное имя.

### Bonus 3: N+1 и lost update

`try_n_plus_1_orm.py` сравнивает ленивую загрузку связей с `selectinload`: ленивый вариант выполняет отдельный запрос для каждого курса, а `selectinload` загружает связи дополнительным пакетным запросом. `try_n_plus_1.py` проверяет GraphQL DataLoader: оба запроса выполняются с фиксированным небольшим числом SQL-запросов вместо запроса на каждую связь.

`try_lost_update.py` сначала воспроизводит потерю обновления при чтении, изменении и записи значения в двух сессиях, затем использует выражение `likes = likes + 1`, вычисляемое базой данных атомарно. Скрипт восстанавливает исходное значение в `finally`.

### Bonus 4: каскадное удаление

Связь `students → enrollments` использует `ON DELETE CASCADE`, а `passive_deletes=True` оставляет удаление базе данных. Для курсов задан `ON DELETE RESTRICT`, поэтому курс с зачислениями удалить нельзя. Поведение проверяется `try_delete.py`.

### Bonus 5: блокирующий resolver

В `blocking_app.py` синхронный GraphQL resolver вызывает блокирующий запрос прямо в event loop и обслуживает четыре параллельных запроса последовательно. REST `def` выполняется FastAPI в thread pool, а `slow_threadpool` явно использует `run_in_threadpool`, поэтому четыре ожидания `pg_sleep(0.5)` выполняются примерно за 0.5 секунды. Для коротких запросов приложения разница мала, но для медленных внешних или БД-операций синхронный resolver блокирует обработку остальных запросов.

### Lab 8: GraphQL и frontend

GraphQL содержит запросы курсов, студентов и зачислений, мутации `enroll`, `likeCourse` и `createStudent`, DataLoader для связанных сущностей, ограничение глубины 5 и максимум 10 aliases. REST и GraphQL используют один слой `services.py`, поэтому правило имени студента реализовано один раз и возвращается в формате каждой транспортной границы.

`try_graphql.py` проверяет 8 сценариев, `try_errors.py` — 5 REST-ошибок, `try_protection.py` — глубину, aliases, лимиты, неверные ID и introspection, `measure.py` сравнивает REST и GraphQL для страницы My Courses, а `blocking_client.py` демонстрирует влияние синхронного resolver.
