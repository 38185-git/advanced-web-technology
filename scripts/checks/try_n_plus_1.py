import httpx

URL = "http://localhost:8000/graphql"
login = httpx.post(
    "http://localhost:8000/auth/login",
    data={"username": "admin@example.com", "password": "admin-demo-password"},
)
login.raise_for_status()
HEADERS = {"Authorization": f"Bearer {login.json()['access_token']}"}

QUERIES = [
    ("students → enrollments → course", "{ students { name enrollments { course { title } } } }"),
    ("enrollments → course, student", "{ enrollments { id course { title } student { name } } }"),
]

for title, query in QUERIES:
    response = httpx.post(URL, json={"query": query}, headers=HEADERS)
    response.raise_for_status()
    rows = len(next(iter(response.json()["data"].values())))
    print(f"{title:<34} rows: {rows:<3} SQL queries: {response.headers['x-sql-queries']}")
