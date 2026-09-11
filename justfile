run:
    python src/main.py

check:
    ruff check .
    pyright

format:
    ruff format .
