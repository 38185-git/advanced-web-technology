# 8 экспериментов GraphQL

Открыть GraphiQL: http://127.0.0.1:8000/graphql

## 1. Получение списка курсов

```graphql
{
  courses(limit: 2) {
    id
  }
}
```

Ожидаемый результат: `ai-integration`, `modern-frontend`.

## 2. Получение курса по ID

```graphql
{
  course(id: "api-design") {
    title
  }
}
```

Ожидаемый результат: `API Design: REST vs GraphQL`.

## 3. Поиск несуществующего курса

```graphql
{
  course(id: "nope") {
    title
  }
}
```

Ожидаемый результат: `course: null`.

## 4. Курсы студента

```graphql
{
  student(id: 2) {
    enrollments {
      course {
        id
      }
    }
  }
}
```

Ожидаемый результат: `3` записи о курсах.

## 5. Повторная запись на курс

```graphql
mutation {
  enroll(input: {courseId: "ai-integration", studentId: "3"}) {
    enrollment {
      id
    }
    userErrors {
      code
    }
  }
}
```

Ожидаемая ошибка: `ALREADY_ENROLLED`.

## 6. Несуществующий курс

```graphql
mutation {
  enroll(input: {courseId: "nope", studentId: "3"}) {
    enrollment {
      id
    }
    userErrors {
      code
    }
  }
}
```

Ожидаемая ошибка: `COURSE_NOT_FOUND`.

## 7. Несуществующий студент

```graphql
mutation {
  enroll(input: {courseId: "web-security", studentId: "999"}) {
    enrollment {
      id
    }
    userErrors {
      code
    }
  }
}
```

Ожидаемая ошибка: `STUDENT_NOT_FOUND`.

## 8. Неверное поле GraphQL

```graphql
{
  course(id: "api-design") {
    titel
  }
}
```

Ожидаемая ошибка GraphQL: поле `titel` не существует в типе `Course`.

## Запуск автоматической проверки

```bash
cd course-catalog-api
source .venv/bin/activate
python try_graphql.py
```
