from alembic import op
from sqlalchemy import CheckConstraint


# Временный CheckConstraint для эксперимента Lab 7.
level_check = CheckConstraint(
    "level IN ('beginner', 'intermediate', 'advanced')",
    name="level",
)


def upgrade() -> None:
    op.create_check_constraint(
        op.f("courses_level_check"),
        "courses",
        "level IN ('beginner', 'intermediate', 'advanced')",
    )


def downgrade() -> None:
    op.drop_constraint(
        op.f("courses_level_check"),
        "courses",
        type_="check",
    )
