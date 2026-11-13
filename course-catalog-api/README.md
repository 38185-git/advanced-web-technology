# Course Catalog API

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

Все бонусы и строки кода: [BONUS_TASKS.md](BONUS_TASKS.md).
