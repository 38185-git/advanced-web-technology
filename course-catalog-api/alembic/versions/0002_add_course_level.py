"""add course level in three safe steps

Revision ID: 0002
Revises: 0001
"""
from typing import Sequence

from alembic import op
import sqlalchemy as sa

revision: str = "0002"
down_revision: str | None = "0001"
branch_labels: Sequence[str] | None = None
depends_on: Sequence[str] | None = None


def upgrade() -> None:
    op.add_column("courses", sa.Column("level", sa.Text(), nullable=True))
    op.execute(
        "UPDATE courses SET level = CASE "
        "WHEN is_elective THEN 'beginner' ELSE 'intermediate' END"
    )
    op.alter_column("courses", "level", existing_type=sa.Text(), nullable=False)


def downgrade() -> None:
    op.drop_column("courses", "level")
