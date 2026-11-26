# Структура проекта

Это учебный monorepo: задания, API, frontend и отдельные материалы по базам
данных находятся рядом. Для Lab 9 бонусы доступны в ветке `lab9-extras`.

```text
.
├── assignments/          исходные задания
├── course-catalog-api/   FastAPI, GraphQL, SQLAlchemy и Alembic
│   ├── alembic/          миграции схемы
│   ├── bonus_examples/   небольшие демонстрации миграций
│   ├── lab9-results/     результаты скриптов проверки и экспериментов
├── course-catalog/       приложение Next.js
│   ├── app/              страницы и Server Actions
│   ├── components/       компоненты интерфейса
│   └── lib/              API-клиенты, сессия и DAL
├── course-catalog-db/    SQL-схема, запросы и лабораторная 6
├── scripts/
│   ├── checks/           повторяемые проверки API
│   ├── experiments/      демонстрации поведения и безопасности
│   └── seed/             вспомогательные материалы учебных данных
└── github-explorer/      отдельное статическое frontend-задание
```

Команды в README запускаются из `course-catalog-api` и указывают на
`../scripts/...`. Runner выставляет рабочую папку API, чтобы импорты приложения
продолжали работать.

Запуск API и полный список команд описаны в
[course-catalog-api/README.md](course-catalog-api/README.md). Frontend запускается
из `course-catalog`; локальные `.env` файлы и сборки не являются исходниками.
