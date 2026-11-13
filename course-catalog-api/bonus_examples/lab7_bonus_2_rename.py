from alembic import op


def upgrade() -> None:
    op.alter_column(
        "courses",
        "description",
        new_column_name="summary",
    )


def downgrade() -> None:
    op.alter_column(
        "courses",
        "summary",
        new_column_name="description",
    )
